import { getTokens, getUserData, type Tokens } from '$lib/auth';
import { mapToUser } from '$lib/types/user';
import { getUser } from '$lib/user/user.js';
import { firestore } from '$lib/firestore';

export const GET = async ({ url }) => {
	const code = extractCode(url);
	const { idToken, accessToken } = await getTokens(code);
	const userReference = mapToUser(await getUserData(accessToken));
	getUser(firestore, userReference);
	return redirectWithCookies(303, { idToken, accessToken });
};

function extractCode(url: URL): string {
	const code = url.searchParams.get('code');
	if (code === null) {
		throw 'ERROR: could not extract code from callback url';
	}
	return code;
}

function redirectWithCookies(status: 302 | 303, cookies: Tokens) {
	const headers = new Headers({ Location: '/' });
	headers.append('Set-Cookie', `idToken=${cookies.idToken}; Secure; HttpOnly;`);
	headers.append('Set-Cookie', `accessToken=${cookies.accessToken}; Secure; HttpOnly;`);
	return new Response(undefined, {
		status: status,
		headers: headers
	});
}
