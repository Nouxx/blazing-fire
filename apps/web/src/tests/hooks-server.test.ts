import { describe, test, expect } from 'vitest';
import { isPreloadEvent, isProtectedRoute } from '../hooks.server';

describe('isPreloadEvent()', () => {
	test('return true for a preload url', () => {
		const fakeUrl = 'http://localhost:5173/account/__data.json?x-sveltekit-invalidated=001';
		expect(isPreloadEvent(fakeUrl)).toStrictEqual(true);
	});
	test('return false for a non preload url', () => {
		const fakeUrl = 'http://localhost:5173/home';
		expect(isPreloadEvent(fakeUrl)).toStrictEqual(false);
	});
});

describe('isProtectedRoute()', () => {
	test('return true for a protected route', () => {
		const fakeUrl = '/(app)/account';
		expect(isProtectedRoute(fakeUrl)).toStrictEqual(true);
	});
	test('return false for a non protected route', () => {
		const fakeUrl = '/auth/signin';
		expect(isProtectedRoute(fakeUrl)).toStrictEqual(false);
	});
});
