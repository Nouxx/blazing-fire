import { getTokens, getUserData } from '$lib/auth';
import { mapToUser } from '$lib/types/user';
import { getUser } from '$lib/user/user.js';
import { firestore } from '$lib/firestore';
import { redirect } from '@sveltejs/kit';

const oneMonth = 60 * 60 * 24 * 30;

// how can I get type completion with CookieSerializeOptions, which does not seems to be exported?
const tokensCookiesOptions = { path: '/', httpOnly: true, secure: true, maxAge: oneMonth };

export const GET = async ({ url, cookies }) => {
	const code = extractCode(url);
	const { idToken, accessToken } = await getTokens(code);
	const userReference = mapToUser(await getUserData(accessToken));
	getUser(firestore, userReference);
	cookies.set('idToken', idToken, tokensCookiesOptions);
	cookies.set('accessToken', accessToken, tokensCookiesOptions);
	throw redirect(303, '/');
};

function extractCode(url: URL): string {
	const code = url.searchParams.get('code');
	if (code === null) {
		throw 'ERROR: could not extract code from callback url';
	}
	return code;
}
