import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			console.log('error', error);
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		const encodedEmail = encodeURIComponent(email);

		throw redirect(303, '/auth/signup/waiting?email=' + encodedEmail);
	}
};
