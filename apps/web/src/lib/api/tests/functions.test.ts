import { describe, expect, test } from 'vitest';
import { extractCodeFromUrl } from '../functions';

describe('extractCodeFromUrl', () => {
	test('should return a code when present', () => {
		// Given
		const fakeCode = '1234';
		const fakeUrlString = `http://url-with-code.com?code=${fakeCode}`;
		const input = new URL(fakeUrlString);
		// When
		const result = extractCodeFromUrl(input);
		// Then
		expect(result).toStrictEqual(fakeCode);
	});
	test('should null when there is no code in the provided url', () => {
		// Given
		const fakeUrlString = `http://url-without-code.com`;
		const input = new URL(fakeUrlString);
		// When
		const result = extractCodeFromUrl(input);
		// Then
		expect(result).toStrictEqual(null);
	});
});
