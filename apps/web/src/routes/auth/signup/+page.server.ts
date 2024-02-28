import { ActionFailure, fail, redirect } from '@sveltejs/kit';
import type { AuthError } from '@supabase/supabase-js';
import type { AuthFormData } from '$lib/types/forms/auth';
import { getStringFromFormValue } from '$lib/forms/form-input';

type SignUpError = {
	message: string;
};

type SignUpFormErrorResponse = {
	error?: SignUpError;
	email: string;
};

function invalidPassword(error: AuthError) {
	return error.status === 422 && error.message.includes('Signup requires a valid password');
}

function invalidEmail(error: AuthError) {
	return error.status === 422 && error.name === 'AuthApiError';
}

function weakPassword(error: AuthError) {
	return error.status === 422 && error.name === 'AuthWeakPasswordError';
}

function formError(
	message: string,
	status: number,
	email: string
): ActionFailure<SignUpFormErrorResponse> {
	return fail<SignUpFormErrorResponse>(status, {
		error: { message },
		email
	});
}

function extractFromFormData(formData: FormData): AuthFormData {
	const email = getStringFromFormValue(formData.get('email'));
	const password = getStringFromFormValue(formData.get('password'));
	return { email, password };
}

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();

		const { email, password } = extractFromFormData(formData);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			if (invalidPassword(error)) {
				return formError('The password you provided is not valid', 422, email);
			}

			if (invalidEmail(error)) {
				return formError('The email you provided is not valid', 422, email);
			}

			if (weakPassword(error)) {
				return formError('The password you provided is too weak.', 422, email);
			}

			return formError('Server Error. Try again later.', 500, email);
		}

		const encodedEmail = encodeURIComponent(email);

		throw redirect(303, '/auth/signup/pending?email=' + encodedEmail);
	}
};
