import { describe, test, expect } from 'vitest';
import { createFakeLocalsWithSupabase } from '$lib/tests/locals-helpers';
import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import { actions } from '../+page.server';
import type { ActionFormInput } from '$lib/tests/action-form-helpers';

describe('actions.signOut', () => {
	test('should throw a Redirect when everything is ok', async () => {
		// Given
		const fakeSupabaseResponse = { error: null };
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signOut', fakeSupabaseResponse);
		const fakeLocal = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeActionForm = {
			locals: fakeLocal
		} as ActionFormInput;
		// When
		const result = actions.signOut(fakeActionForm);
		// Then
		await expect(result).rejects.toThrowError(); //todo: refactor
	});
	test('should throw an HttpError when there is an error', async () => {
		// Given
		const fakeSupabaseResponse = { error: { status: 500 } };
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signOut', fakeSupabaseResponse);
		const fakeLocal = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeActionForm = {
			locals: fakeLocal
		} as ActionFormInput;
		// When
		const result = actions.signOut(fakeActionForm);
		// Then
		await expect(result).rejects.toThrowError(); //todo: refactor
	});
});
