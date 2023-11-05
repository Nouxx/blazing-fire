import { extractCodeFromUrl, getHttpStatusOrDefault } from '$lib/api/functions';
import type { Database } from '$lib/database/types';
import type { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export async function _signInUserAfterSignUp(
	code: string,
	supabaseClient: SupabaseClient<Database>
) {
	// unlike most other supabase functions, exchangeCodeForSession throws the error object (instead of returning it)
	// https://github.com/supabase/auth-js/issues/782
	const result = await supabaseClient.auth
		.exchangeCodeForSession(code)
		.catch((error: AuthError) => {
			return {
				data: {
					user: null,
					session: null
				},
				error
			};
		});
	return result;
}

export const GET = async ({ url, locals: { supabase } }) => {
	const code = extractCodeFromUrl(url);

	if (code === null) {
		redirect(303, '/auth/signup/error');
	}

	const { error: supabaseError } = await _signInUserAfterSignUp(code, supabase);

	if (supabaseError) {
		const { status, name, message } = supabaseError;
		error(getHttpStatusOrDefault(status), { name, message });
	}

	redirect(303, '/auth/signup/success');
};
