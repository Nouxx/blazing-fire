import { describe, expect, test } from 'vitest';
import { shouldSignInButtonBeDisabled } from './functions';

describe('shouldSignInButtonBeDisabled()', () => {
	test.each([
		[false, 'you@mail.com', 'qwerty123'],
		[true, undefined, 'qwerty123'],
		[true, 'you@mail.com', undefined],
		[true, undefined, undefined]
	])('should return %s if email is %s and password is %s', (expected, email, password) => {
		expect(shouldSignInButtonBeDisabled(email, password)).toBe(expected);
	});
});
