import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import type { AuthTokenResponse } from '@supabase/supabase-js';
import { describe, expect, test } from 'vitest';
import { _signInUserAfterSignUp } from '../+server';

describe('_signInUserAfterSignUp', () => {
	test('should return the response when no error is catched', async () => {
		// Given
		const fakeCode = 'thisIsAFakeCode';
		const fakeSupabaseResponse = {
			data: {},
			error: null
		} as AuthTokenResponse;
		const fakeSupabaseClient = createFakeAuthSupabaseClient(
			'exchangeCodeForSession',
			fakeSupabaseResponse
		);
		// When
		const result = await _signInUserAfterSignUp(fakeCode, fakeSupabaseClient);
		// Then
		const expectedResult = {
			data: {},
			error: null
		};
		expect(result).toEqual(expectedResult);
	});
	test('should return an error when an error is catched', async () => {
		// Given
		const fakeCode = 'thisIsAFakeCode';
		const fakeSupabaseResponse = {
			status: 500,
			name: 'ErrorTestName',
			message: 'this is a message'
		};
		const fakeSupabaseClient = createFakeAuthSupabaseClient(
			'exchangeCodeForSession',
			fakeSupabaseResponse,
			true
		);
		// When
		const result = await _signInUserAfterSignUp(fakeCode, fakeSupabaseClient);
		// Then
		const expectedResult = {
			data: {
				user: null,
				session: null
			},
			error: fakeSupabaseResponse
		};
		expect(result).toEqual(expectedResult);
	});
});
