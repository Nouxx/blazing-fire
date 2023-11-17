import { getTokens, getUserData } from '$lib/auth';
import { mapToUser } from '$lib/types/user';
import { getUser } from '$lib/user/user.js';
import { firestore } from '$lib/firestore';

export const GET = async ({ url }) => {
	const code = extractCode(url);
	const { idToken, accessToken } = await getTokens(code);
	const userReference = mapToUser(await getUserData(accessToken));
	getUser(firestore, userReference);
	return redirectResponse(303, `idToken=${idToken}`);
};

function extractCode(url: URL): string {
	const code = url.searchParams.get('code');
	if (code === null) {
		throw 'ERROR: could not extract code from callback url';
	}
	return code;
}

function redirectResponse(status: 302 | 303, cookie: string) {
	return new Response(undefined, {
		status: status,
		headers: { Location: '/', 'Set-Cookie': `${cookie}; Secure; HttpOnly;` }
	});
}
