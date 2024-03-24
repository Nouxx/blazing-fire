import { extractCodeFromUrl } from '$lib/api/functions';
import { signInUserAfterSignUp } from '$lib/auth/functions';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = extractCodeFromUrl(url);

	if (code === null) {
		throw redirect(303, '/auth/signup/error');
	}

	await signInUserAfterSignUp(code, supabase);

	throw redirect(303, '/auth/signup/success');
};
