import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { AuthError } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { getStringFromFormValue } from '$lib/forms/form-input';
import type { AuthFormData } from '$lib/types/forms/auth';
import { routes } from '$lib/const/routes';
import { redirectIfSession } from '$lib/server/auth';

function extractFromFormData(formData: FormData): AuthFormData {
	const email = getStringFromFormValue(formData.get('email'));
	const password = getStringFromFormValue(formData.get('password'));
	return { email, password };
}

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

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session } = locals;
	redirectIfSession(session);
};

export const actions: Actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		console.log('DEBUG /signInWithPassword');
		const formData = await request.formData();

		const { email, password } = extractFromFormData(formData);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			console.log('DEBUG /signInWithPassword - error');
			console.log({
				msg: error.message,
				name: error.name,
				cause: error.cause,
				stk: error.stack,
				stat: error.status
			});
			if (isWrongCredentialsError(error)) {
				return signInFormError('Invalid credentials', email);
			}
			return fail<SignInFormError>(500, signInFormError('Server error. Try again later.', email));
		}

		redirect(303, routes.home);
	}
};
