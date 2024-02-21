export function getStringFromFormValue(value: FormDataEntryValue | null): string {
	if (value === null || typeof value !== 'string') {
		return '';
	}
	return value;
}
