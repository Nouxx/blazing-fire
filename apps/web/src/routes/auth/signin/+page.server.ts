import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { AuthError } from '@supabase/supabase-js';
import { extractFromFormData } from '$lib/functions';

type SignInFormError = {
	error: string;
	email: string;
};

function isWrongCredentialsError(error: AuthError | null) {
	return error?.status === 400;
}

function signInFormError(message: string, email: string): SignInFormError {
	return {
		error: message,
		email
	};
}

export const actions: Actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const { email, password } = extractFromFormData(formData);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			if (isWrongCredentialsError(error)) {
				return signInFormError('Invalid credentials', email);
			}
			return fail<SignInFormError>(500, signInFormError('Server error. Try again later.', email));
		}
		throw redirect(303, '/home');
	}
};
