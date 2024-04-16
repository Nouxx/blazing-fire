import { type ActionFailure, fail, redirect } from '@sveltejs/kit';
import type { AuthError } from '@supabase/supabase-js';
import type { AuthFormData } from '$lib/types/forms/auth';
import { getStringFromFormValue } from '$lib/forms/form-input';
import type { PageServerLoad } from './$types';
import { routes } from '$lib/types/routes';
import { redirectIfSession } from '$lib/server/auth';

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

export function _handleError(
	error: AuthError,
	email: string
): ActionFailure<SignUpFormErrorResponse> {
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

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session } = locals;
	redirectIfSession(session);
};

export const actions = {
	signUp: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();

		const { email, password } = extractFromFormData(formData);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}${routes.signupConfirm}`
			}
		});

		if (error) {
			return _handleError(error, email);
		}

		const encodedEmail = encodeURIComponent(email);

		redirect(303, `${routes.signupPending}?email=${encodedEmail}`);
	}
};
