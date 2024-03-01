import { describe, test, expect } from 'vitest';
import { load } from '../+page.server';

describe('load', () => {
	test('return email when provided', async () => {
		// Given
		const fakeEmail = 'fake@mail.com';
		const fakeEncodedEmail = encodeURIComponent('fake@mail.com');
		const fakeUrl = new URL(`http://fake-url.com?email=${fakeEncodedEmail}`);
		// When
		const result = await load({ url: fakeUrl });
		// Then
		const expected = {
			email: fakeEmail
		};
		expect(result).toMatchObject(expected);
	});
});
