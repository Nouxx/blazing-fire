export function shouldSignInButtonBeDisabled(
	email: string | undefined,
	password: string | undefined
): boolean {
	return !email || !password;
}
