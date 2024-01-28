import { AuthApiError, AuthWeakPasswordError, type AuthError } from '@supabase/supabase-js';
import { ActionFailure, fail, redirect } from '@sveltejs/kit';

type SignUpError = {
	userFriendlyMessage: string;
};

type SignUpFormResponse = {
	error?: SignUpError;
	email: string;
};

function notValidPassword(error: AuthError) {
	return (
		error instanceof AuthApiError &&
		error.status === 422 &&
		error.message === 'Signup requires a valid password'
	);
}

function notValidEmail(error: AuthError) {
	return (
		error instanceof AuthApiError &&
		error.status === 422 &&
		error.message.includes('Unable to validate email address: invalid format')
	);
}

function weakPassword(error: AuthError) {
	return (
		error instanceof AuthWeakPasswordError &&
		error.status === 422 &&
		error.message.includes('Password should be at least 6 characters')
	);
}

function userAlreadyRegistered(error: AuthError) {
	return (
		error instanceof AuthApiError &&
		error.status === 400 &&
		error.message.includes('User already registered')
	);
}

function genericError(email: string): ActionFailure<SignUpFormResponse> {
	return fail<SignUpFormResponse>(500, {
		error: {
			userFriendlyMessage: 'Server error. Try again later.'
		},
		email
	});
}

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
			// console.log(`ERROR ${error.status}`, error.message, error.name);
			// we return fail so that the form is not update don the client
			if (notValidPassword(error)) {
				return fail<SignUpFormResponse>(422, {
					error: {
						userFriendlyMessage: 'The password you provided is not valid'
					},
					email
				});
			}
			if (notValidEmail(error)) {
				return fail<SignUpFormResponse>(422, {
					error: {
						userFriendlyMessage: 'The email you provided is not valid'
					},
					email
				});
			}
			if (weakPassword(error)) {
				return fail<SignUpFormResponse>(422, {
					error: {
						userFriendlyMessage: 'The password you provided is too weak. Follow the instructions'
					},
					email
				});
			}
			if (userAlreadyRegistered(error)) {
				return genericError(email);
			}
			return genericError(email);
		}

		const encodedEmail = encodeURIComponent(email);

		throw redirect(303, '/auth/signup/pending?email=' + encodedEmail);
	}
};
