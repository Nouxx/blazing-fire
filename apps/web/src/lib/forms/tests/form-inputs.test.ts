import { describe, expect, test } from 'vitest';
import { getStringFromFormValue } from '../form-input';

describe('getStringFromFormValue', () => {
	test('should return "" when a file is provided', () => {
		// Given
		const blob = new Blob(['fake file content'], { type: 'text/plain' });
		const fakeFile = new File([blob], 'fake-file.txt', { type: 'text/plain' });
		// When
		const result = getStringFromFormValue(fakeFile);
		// Then
		expect(result).toStrictEqual('');
	});
});

describe('getStringFromFormValue', () => {
	test.each([
		['a-string', 'a-string'],
		['', null]
	])('should return "%s" if value provided is %s', (expected, value) => {
		expect(getStringFromFormValue(value)).toBe(expected);
	});
});
