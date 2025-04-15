import { describe, test, expect } from 'vitest';
import { actions } from '../+page.server';
import type { AuthTokenResponsePassword } from '@supabase/supabase-js';
import {
	createFakeSignInFormData,
	createFakeActionFormRequest
} from '$lib/tests/action-form-helpers';
import type { ActionFormInput } from '$lib/tests/action-form-helpers';
import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import { createFakeLocalsWithSupabase } from '$lib/tests/locals-helpers';

describe('actions.signInWithPassword()', () => {
	test('should throw a redirect when sign in is successful', async () => {
		// Given
		const mockEmail = 'test@mail.com';
		const mockForm = createFakeSignInFormData(mockEmail, 'a-random-password');
		const mockRequest = createFakeActionFormRequest(mockForm);
		const mockSupabaseResponse = {
			error: null
		} as AuthTokenResponsePassword;
		const mockSupabaseClient = createFakeAuthSupabaseClient(
			'signInWithPassword',
			mockSupabaseResponse
		);
		const mockLocals = createFakeLocalsWithSupabase(mockSupabaseClient);
		const mockActionForm = {
			request: mockRequest,
			locals: mockLocals
		} as ActionFormInput;

		// When
		const result = async () => actions.signInWithPassword(mockActionForm);

		// Then
		await expect(result).rejects.toThrowError(); //todo: refactor
	});

	test('should return an error object when credentials are invalid', async () => {
		// Given
		const mockEmail = 'test@mail.com';
		const mockForm = createFakeSignInFormData(mockEmail, 'a-random-password');
		const mockRequest = createFakeActionFormRequest(mockForm);
		const mockSupabaseError = {
			error: {
				status: 400
			}
		} as AuthTokenResponsePassword;
		const mockSupabaseClient = createFakeAuthSupabaseClient(
			'signInWithPassword',
			mockSupabaseError
		);
		const mockLocals = createFakeLocalsWithSupabase(mockSupabaseClient);
		const mockActionForm = {
			request: mockRequest,
			locals: mockLocals
		} as ActionFormInput;

		// When
		const result = await actions.signInWithPassword(mockActionForm);

		// Then
		const expectedResult = {
			status: 400,
			data: {
				action: 'signInWithPassword',
				error: { message: 'Invalid credentials' },
				data: { email: 'test@mail.com' }
			}
		};
		expect(result).toEqual(expectedResult);
	});

	test('should throw an ActionFailure when an error occurs', async () => {
		// Given
		const mockEmail = 'test@mail.com';
		const mockForm = createFakeSignInFormData(mockEmail, 'a-random-password');
		const mockRequest = createFakeActionFormRequest(mockForm);
		const mockSupabaseError = {
			error: {
				message: 'a generic error',
				status: 500
			}
		} as AuthTokenResponsePassword;
		const mockSupabaseClient = createFakeAuthSupabaseClient(
			'signInWithPassword',
			mockSupabaseError
		);
		const mockLocals = createFakeLocalsWithSupabase(mockSupabaseClient);
		const mockActionForm = {
			request: mockRequest,
			locals: mockLocals
		} as ActionFormInput;

		// When
		const result = await actions.signInWithPassword(mockActionForm);

		// Then
		const expectedResult = {
			status: 500,
			data: {
				action: 'signInWithPassword',
				error: { message: 'Server error' },
				data: { email: 'test@mail.com' }
			}
		};
		expect(result).toEqual(expectedResult);
	});
});
