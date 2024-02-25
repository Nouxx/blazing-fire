import {
	createFakeAuthSupabaseClient,
	createFakeAuthSupabaseClientV2
} from '$lib/tests/supabase-helpers';
import type { AuthTokenResponse } from '@supabase/supabase-js';
import { describe, expect, test } from 'vitest';
import { signInUserAfterSignUp } from '../functions';
import type { HttpError } from '@sveltejs/kit';

describe('signInUserAfterSignUp', () => {
	test('should not throw anything when no error is catched', async () => {
		// Given
		const fakeCode = 'thisIsAFakeCode';
		const fakeSupabaseResponse = {
			data: {},
			error: null
		} as AuthTokenResponse;
		const fakeSupabaseClient = createFakeAuthSupabaseClient(fakeSupabaseResponse);
		// When
		const result = await signInUserAfterSignUp(fakeCode, fakeSupabaseClient);
		// Then
		expect(result).toBe(undefined);
	});
	test('should throw an HttpError when an error is catched', async () => {
		// Given
		const fakeCode = 'thisIsAFakeCode';
		const fakeSupabaseResponse = {
			status: 500,
			name: 'ErrorTestName',
			message: 'this is a message'
		};
		const fakeSupabaseClient = createFakeAuthSupabaseClientV2(
			'exchangeCodeForSession',
			fakeSupabaseResponse,
			true
		);
		// When
		const result = signInUserAfterSignUp(fakeCode, fakeSupabaseClient);
		// Then
		const expectedThrownError: HttpError = {
			status: fakeSupabaseResponse.status,
			body: {
				name: fakeSupabaseResponse.name,
				message: fakeSupabaseResponse.message
			}
		};
		await expect(result).rejects.toMatchObject(expectedThrownError);
	});
});
