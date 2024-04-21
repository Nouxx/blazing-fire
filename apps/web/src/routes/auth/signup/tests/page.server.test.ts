import { describe, test, expect } from 'vitest';
import { _handleError, actions } from '../+page.server';
import type { AuthError, AuthResponse } from '@supabase/supabase-js';
import {
	createFakeSignInFormData,
	createFakeActionFormRequest
} from '$lib/tests/action-form-helpers';
import type { ActionFormInput } from '$lib/tests/action-form-helpers';
import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import { createFakeLocalsWithSupabase } from '$lib/tests/locals-helpers';

describe('actions.signUp', () => {
	test('should throw a redirect when sign up is successful', async () => {
		// Given
		const fakeEmail = 'fake@mail.com';
		const fakeForm = createFakeSignInFormData(fakeEmail, 'a-random-password');
		const fakeRequest = createFakeActionFormRequest(fakeForm);

		const fakeUrl = new URL('http://fake-url.com');

		const fakeSupabaseResponse = {
			data: {},
			error: null
		} as AuthResponse;
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signUp', fakeSupabaseResponse);
		const fakeLocals = createFakeLocalsWithSupabase(fakeSupabaseClient);

		const fakeActionForm = {
			request: fakeRequest,
			url: fakeUrl,
			locals: fakeLocals
		} as ActionFormInput;

		// When
		const result = async () => actions.signUp(fakeActionForm);

		// Then
		await expect(result).rejects.toMatchObject({
			status: 303,
			location: '/auth/signup/pending?email=fake%40mail.com'
		});
	});
	test('should throw an error when an error with the signup occurs', async () => {
		// Given
		const fakeEmail = 'fake@mail.com';
		const fakeForm = createFakeSignInFormData(fakeEmail, 'a-random-password');
		const fakeRequest = createFakeActionFormRequest(fakeForm);

		const fakeUrl = new URL('http://fake-url.com');

		const fakeSupabaseResponse = {
			data: { user: null, session: null },
			error: { status: 500, message: 'generic error', name: 'AnyError' } as AuthError
		} as AuthResponse;
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signUp', fakeSupabaseResponse);
		const fakeLocals = createFakeLocalsWithSupabase(fakeSupabaseClient);

		const fakeActionForm = {
			request: fakeRequest,
			url: fakeUrl,
			locals: fakeLocals
		} as ActionFormInput;

		// When
		const result = await actions.signUp(fakeActionForm);

		// Then
		expect(result).toMatchObject({
			status: 500,
			data: {
				error: { message: 'Server Error. Try again later.' },
				email: fakeEmail
			}
		});
	});
});

describe('_handleError', () => {
	const fakeEmail = 'fake@mail.com';

	function createFakeError(status: number, message: string, name: string) {
		return { status, message, name } as AuthError;
	}

	test('should return an invalid password error', () => {
		// Given
		const fakeError = createFakeError(422, 'Signup requires a valid password', 'AnyError');
		// When
		const result = _handleError(fakeError, fakeEmail);
		// Then
		const expectedReturn = {
			status: fakeError.status,
			data: {
				email: fakeEmail,
				error: {
					message: 'The password you provided is not valid'
				}
			}
		};
		expect(result).toMatchObject(expectedReturn);
	});
	test('should return an invalid email error', () => {
		// Given
		const fakeError = createFakeError(422, 'dummy message', 'AuthApiError');
		// When
		const result = _handleError(fakeError, fakeEmail);
		// Then
		const expectedReturn = {
			status: fakeError.status,
			data: {
				email: fakeEmail,
				error: {
					message: 'The email you provided is not valid'
				}
			}
		};
		expect(result).toMatchObject(expectedReturn);
	});
	test('should return a weak password error', () => {
		// Given
		const fakeError = createFakeError(422, 'dummy message', 'AuthWeakPasswordError');
		// When
		const result = _handleError(fakeError, fakeEmail);
		// Then
		const expectedReturn = {
			status: fakeError.status,
			data: {
				email: fakeEmail,
				error: {
					message: 'The password you provided is too weak.'
				}
			}
		};
		expect(result).toMatchObject(expectedReturn);
	});
	test('should return a generic error', () => {
		// Given
		const fakeError = createFakeError(500, 'dummy message', 'AnyError');
		// When
		const result = _handleError(fakeError, fakeEmail);
		// Then
		const expectedReturn = {
			status: fakeError.status,
			data: {
				email: fakeEmail,
				error: {
					message: 'Server Error. Try again later.'
				}
			}
		};
		expect(result).toMatchObject(expectedReturn);
	});
});
