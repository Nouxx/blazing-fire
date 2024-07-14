import { APIRequestContext } from '@playwright/test';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

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

export class SupabaseTestHelpers {
	private readonly supabaseClient: SupabaseClient;
	private readonly inbucketUrl = 'http://inbucket:9000';

	constructor(supabaseUrl: string, supabaseKey: string) {
		this.supabaseClient = createClient(supabaseUrl, supabaseKey);
	}

	async deleteUserByEmail(mail: string) {
		const userId = await this.findUserIdByMail(mail);
		if (!userId) {
			console.log(`No user found for mail "${mail}", skipping.`);
			return;
		}
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
		if (!data[0]) {
			return null;
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
		console.log(`All menus deleted for user ${mail}`);
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

export function createSupabaseHelpers() {
	const url = process.env.SUPABASE_URL ?? '';
	const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

	const missingVariables: string[] = [];

	if (url === '') {
		missingVariables.push('URL');
	}

	if (roleKey === '') {
		missingVariables.push('Role Key');
	}

	if (missingVariables.length > 0) {
		throw new Error(
			`Supabase Test Helper can't be instanciated, missing: ${missingVariables.join(', ')}`
		);
	}

	return new SupabaseTestHelpers(url, roleKey);
}
