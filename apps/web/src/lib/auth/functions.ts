import { getHttpStatusOrDefault } from '$lib/api/functions';
import type { Database } from '$lib/database/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

export async function signInUserAfterSignUp(
	code: string,
	supabaseClient: SupabaseClient<Database>
): Promise<void> {
	await supabaseClient.auth.exchangeCodeForSession(code).catch((_error) => {
		const { status, name, message } = _error;
		throw error(getHttpStatusOrDefault(status), { name, message });
	});
}
