import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import type { Session } from '@supabase/supabase-js';
import { describe, expect, test } from 'vitest';
import { getSession } from '../session';

describe('getSession', () => {
	test('should return a session', async () => {
		// Given
		const fakeSession = { access_token: 'fake-token' } as Session;
		const fakeSupabaseSession = { data: { session: fakeSession } };
		const fakeSupabaseClient = createFakeAuthSupabaseClient(fakeSupabaseSession);
		// When
		const result = await getSession(fakeSupabaseClient);
		// Then
		expect(result).toStrictEqual(fakeSession);
	});
});
