import { redirect } from '@sveltejs/kit';
import { type EmailOtpType } from '@supabase/supabase-js';
import { routes } from '$lib/types/routes';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;

	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ token_hash, type });
		if (!error) {
			redirect(303, routes.signupSuccess);
		}
		console.log('GET /auth/confirm', error);
	}

	redirect(303, '/error/signup');
};
