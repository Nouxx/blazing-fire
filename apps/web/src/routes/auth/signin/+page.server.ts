import { fail, type Actions, redirect } from '@sveltejs/kit';
import { AuthApiError, type AuthError } from '@supabase/supabase-js';
import { extractFromFormData } from '$lib/functions';

function isWrongCredentialsError(error: AuthError | null) {
	return error instanceof AuthApiError && error.status === 400;
}

function signInFormError(message: string, email: string): SignInFormError {
	return {
		error: message,
		email
	};
}

type SignInFormError = {
	error: string;
	email: string;
};

export const actions: Actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const { email, password } = extractFromFormData(formData);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			// todo: maybe a better way (typeguard?)
			if (isWrongCredentialsError(error)) {
				return signInFormError('Invalid credentials', email);
			}
			return fail<SignInFormError>(500, signInFormError('Server error. Try again later.', email));
		}
		throw redirect(303, '/home');
	}
};
