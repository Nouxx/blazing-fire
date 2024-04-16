import { describe, test, expect, vi } from 'vitest';
import { actions } from '../+page.server';
import { createFakeLocalsWithSupabase } from '$lib/tests/locals-helpers';
import { createFakeAuthSupabaseClient } from '$lib/tests/supabase-helpers';
import type { ActionFormInput } from '$lib/tests/action-form-helpers';
import * as svelte from '@sveltejs/kit';

describe('actions.signOut', () => {
	test('should call redirect() when everything is ok', async () => {
		// Given
		const redirectSpy = vi.spyOn(svelte, 'redirect');
		const fakeSupabaseResponse = { error: null };
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signOut', fakeSupabaseResponse);
		const fakeLocal = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeActionForm = {
			locals: fakeLocal
		} as ActionFormInput;
		// When
		const result = actions.signOut(fakeActionForm);
		// Then
		await expect(result).rejects.toThrowError();
		expect(redirectSpy).toHaveBeenCalledTimes(1);
		expect(redirectSpy).toHaveBeenCalledWith(303, '/');
	});
	test('should call error() when there is an error', async () => {
		// Given
		const errorSpy = vi.spyOn(svelte, 'error');
		const fakeSupabaseResponse = { error: { status: 500 } };
		const fakeSupabaseClient = createFakeAuthSupabaseClient('signOut', fakeSupabaseResponse);
		const fakeLocal = createFakeLocalsWithSupabase(fakeSupabaseClient);
		const fakeActionForm = {
			locals: fakeLocal
		} as ActionFormInput;
		// When
		const result = actions.signOut(fakeActionForm);
		// Then
		await expect(result).rejects.toThrowError();
		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy).toHaveBeenCalledWith(500, {
			name: 'Something went wrong logging you out.',
			message: 'LogOutError'
		});
	});
});
