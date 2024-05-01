import { SupabaseClient, createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

export class AuthHelpers {
	private readonly supabaseClient: SupabaseClient;

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
}
