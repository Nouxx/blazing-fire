import { createFakeLocalsWithSession } from '$lib/tests/locals-helpers';
import type { Session } from '@supabase/supabase-js';
import { describe, expect, test } from 'vitest';
import { load } from '../+layout.server';

describe('load', () => {
	test('should return the session when given one', async () => {
		// Given
		const fakeSession = { access_token: 'fake-token' } as Session;
		const fakeLocal = createFakeLocalsWithSession(fakeSession);
		// When
		const result = await load({ locals: fakeLocal });
		// Then
		const expectedReturn = {
			session: fakeSession
		};
		expect(result).toStrictEqual(expectedReturn);
	});
});
