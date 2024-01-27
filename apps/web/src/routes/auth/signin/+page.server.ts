import { fail, type Actions, redirect } from '@sveltejs/kit';
import { AuthApiError, type AuthError } from '@supabase/supabase-js';

function isWrongCredentialsError(error: AuthError | null) {
	return error instanceof AuthApiError && error.status === 400;
}

type SignInFormError = {
	error: string;
	email: string;
};

export const actions: Actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string; // todo: remove cast
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			if (isWrongCredentialsError(error)) {
				// if we return fail(), the form is not updated on the client-side
				return {
					error: 'Invalid credentials',
					email
				};
			}
			return fail<SignInFormError>(500, {
				error: 'Server error. Try again later.',
				email
			});
		}
		throw redirect(303, '/home');
	}
};
