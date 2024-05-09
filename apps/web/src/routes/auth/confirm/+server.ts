import { redirect } from '@sveltejs/kit';
import { type EmailOtpType } from '@supabase/supabase-js';
import { routes } from '$lib/const/routes';

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
	}
	// this is setting cookie to NULL
	redirect(303, routes.signupError);
};
