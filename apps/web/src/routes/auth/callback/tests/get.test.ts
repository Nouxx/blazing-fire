import { createFakeLocalsWithSupabase } from '$lib/tests/locals-helpers';
import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, test, expect } from 'vitest';
import { GET } from '../+server';
import type { HttpError, Redirect } from '@sveltejs/kit';
import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';

describe('GET auth/callback', () => {
	test('throw a redirect to the error page when no code is provided', async () => {
		// Given
		const fakeSupabaseClient = {} as SupabaseClient;
		const fakeLocals = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeInput = {
			url: new URL('https://a-fake-url.com'),
			locals: fakeLocals
		};
		// When
		const result = GET(fakeInput);
		// Then
		const expectedThrownRedirect: Redirect = {
			status: 303,
			location: '/auth/signup/error'
		};
		await expect(result).rejects.toMatchObject(expectedThrownRedirect);
	});
	test('throw an HttpError when there is an issue with the sign in', async () => {
		// Given
		const fakeResponseThrown = {
			status: 403,
			message: 'this is a message for a test error',
			name: 'ErrorTestName'
		};
		const fakeSupabaseClient = createFakeAuthSupabaseClient(
			'exchangeCodeForSession',
			fakeResponseThrown,
			true
		);
		const fakeLocals = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeInput = {
			url: new URL('https://a-fake-url.com?code=1234'),
			locals: fakeLocals
		};
		// When
		const result = GET(fakeInput);
		// Then
		const expectedThrownError: HttpError = {
			status: fakeResponseThrown.status,
			body: {
				message: fakeResponseThrown.message,
				name: fakeResponseThrown.name
			}
		};
		await expect(result).rejects.toMatchObject(expectedThrownError);
	});
	test('throw a redirect to the success page when there is no error', async () => {
		// Given
		const fakeResponseFromSupabase = {};
		const fakeSupabaseClient = createFakeAuthSupabaseClient(
			'exchangeCodeForSession',
			fakeResponseFromSupabase
		);
		const fakeLocals = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeInput = {
			url: new URL('https://a-fake-url.com?code=1234'),
			locals: fakeLocals
		};
		// When
		const result = GET(fakeInput);
		// Then
		const expectedThrownRedirect: Redirect = {
			status: 303,
			location: '/auth/signup/success'
		};
		await expect(result).rejects.toMatchObject(expectedThrownRedirect);
	});
});
