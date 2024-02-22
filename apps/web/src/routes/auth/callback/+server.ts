import { extractCodeFromUrl } from '$lib/api/functions';
import type { Database } from '$lib/database/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

async function signInUser(code: string, supabaseClient: SupabaseClient<Database>) {
	try {
		await supabaseClient.auth.exchangeCodeForSession(code);
	} catch (error) {
		// for later use (logging)
		// const { name, message, status } = error;
	}
}

export const GET = async ({ url, locals: { supabase } }) => {
	const code = extractCodeFromUrl(url);

	if (code === null) {
		throw redirect(303, '/auth/signup/error');
	}

	await signInUser(code, supabase);

	throw redirect(303, '/auth/signup/success');
};
