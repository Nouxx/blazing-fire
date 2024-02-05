export function shouldSignInButtonBeDisabled(
	email: string | undefined,
	password: string | undefined
): boolean {
	return !email || !password;
}

export type AuthFormData = {
	email: string;
	password: string;
};

function getStringFromFormValue(value: FormDataEntryValue | null): string {
	if (typeof value !== 'string') {
		throw 'Not a string';
	}
	return value ?? '';
}

export function extractFromFormData(formData: FormData): AuthFormData {
	const email = getStringFromFormValue(formData.get('email'));
	const password = getStringFromFormValue(formData.get('password'));
	return { email, password };
}
