import type { Database } from '$lib/database/types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

export async function getSession(
	supabaseClient: SupabaseClient<Database>
): Promise<Session | null> {
	const {
		data: { session }
	} = await supabaseClient.auth.getSession();
	return session;
}
