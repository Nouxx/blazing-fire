import { redirect } from '@sveltejs/kit';
import { type EmailOtpType } from '@supabase/supabase-js';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;

	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? '/auth/signup/success';

	console.log({ token_hash, type, next });

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ token_hash, type });
		if (!error) {
			redirect(303, `/${next.slice(1)}`);
		}
	}

	redirect(303, '/auth/signup/error');
};