import { APIRequestContext } from '@playwright/test';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

/**
 * reference: https://github.com/inbucket/inbucket/wiki/REST-GET-message
 */
type InbucketMail = {
	body: {
		text: string;
	};
};

/**
 * reference: https://github.com/inbucket/inbucket/wiki/REST-GET-mailbox
 */
type InbucketMailboxItem = {
	id: string;
	'posix-millis': number;
};

export class TestHelpers {
	private readonly supabaseClient: SupabaseClient;
	private readonly inbucketUrl = 'http://127.0.0.1:54324';

	constructor() {
		dotenv.config();
		this.supabaseClient = createClient(
			process.env.SUPABASE_URL ?? '',
			process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
		);
	}

	async deleteUserByEmail(mail: string) {
		const userId = await this.findUserIdByMail(mail);
		await this.deleteUserById(userId);
		console.log(`User "${mail}" deleted.`);
	}

	private async findUserIdByMail(mail: string) {
		const { data, error } = await this.supabaseClient.rpc('get_user_id_by_email', {
			email: mail
		});
		if (error) {
			throw `Error fetching user id for email ${mail}, ${JSON.stringify(error)}`;
		}
		return data[0].id;
	}

	private async deleteUserById(userId: string) {
		const { data, error } = await this.supabaseClient.auth.admin.deleteUser(userId);
		if (error) {
			throw `Error deleting the user ${userId}, ${error}`;
		}
		return data;
	}

	async deleteMenusForUser(mail: string) {
		const userId = await this.findUserIdByMail(mail);
		await this.supabaseClient.from('menus').delete().eq('user_id', userId);
		console.log(`All menus deleted of user ${mail}`);
	}

	/**
	 * fetch the confirmation link of the latest email sent to the provided mailbox
	 * @param request
	 * @param mailbox
	 */
	async fetchConfirmationLink(request: APIRequestContext, mailbox: string): Promise<string> {
		const fetchMailboxResponse = await request.get(`${this.inbucketUrl}/api/v1/mailbox/${mailbox}`);
		const mails: InbucketMailboxItem[] = await fetchMailboxResponse.json();
		const mostRecentEmail: InbucketMailboxItem = mails.reduce(
			(accumulator: InbucketMailboxItem, current: InbucketMailboxItem) =>
				accumulator['posix-millis'] > current['posix-millis'] ? accumulator : current
		);
		const fetchMailResponse = await request.get(
			`${this.inbucketUrl}/api/v1/mailbox/${mailbox}/${mostRecentEmail.id}`
		);
		const mail: InbucketMail = await fetchMailResponse.json();
		const linkRegExpMatch = mail.body.text.match(/(http.*)(?= \))/g);
		if (linkRegExpMatch === null) {
			throw 'No confirmation link matched';
		}
		return linkRegExpMatch[0];
	}
}
