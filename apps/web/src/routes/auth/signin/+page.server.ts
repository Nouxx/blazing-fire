import { type Actions, redirect, type ActionFailure } from '@sveltejs/kit';
import type { AuthError } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { getStringFromFormValue } from '$lib/forms/form-input';
import type { AuthFormData } from '$lib/types/forms/auth';
import { routes } from '$lib/const/routes';
import { redirectIfSession } from '$lib/server/auth';
import {
	createFormActionsFailureResponse,
	type FormActionsFailureResponse
} from '$lib/server/form';

type SignInPageActionsName = 'signInWithPassword';

type SignInPageResponseData = null;

type SignInPageFormActionsFailure = FormActionsFailureResponse<
	SignInPageActionsName,
	SignInPageResponseData
>;

function extractFromFormData(formData: FormData): AuthFormData {
	const email = getStringFromFormValue(formData.get('email'));
	const password = getStringFromFormValue(formData.get('password'));
	return { email, password };
}

function isWrongCredentialsError(error: AuthError | null) {
	return error?.status === 400;
}

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session } = locals;
	redirectIfSession(session);
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
			if (isWrongCredentialsError(error)) {
				return createFormActionsFailureResponse(400, {
					action: 'signInWithPassword',
					error: {
						message: 'Invalid credentials'
					},
					data: { email }
				});
			}

			return createFormActionsFailureResponse(400, {
				action: 'signInWithPassword',
				error: {
					message: 'Server error'
				},
				data: { email }
			});
		}

		redirect(303, routes.home);
	}
	// signin does not return any data, hence the any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Actions<any | ActionFailure<SignInPageFormActionsFailure>>;
