import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const GET = async ({ url }) => {
	const redirectURL = 'http://localhost:5173/auth';
	const code = await url.searchParams.get('code');

	try {
		const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL);
		const r = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(r.tokens);
		const user = oAuth2Client.credentials;
		console.log('id token', user.id_token);
		await getUserData(user.access_token);
		oAuth2Client.verifyIdToken({ idToken: user.id_token, audience: GOOGLE_CLIENT_ID });
		// const newToken = (await oAuth2Client.refreshAccessToken()).credentials.id_token;
	} catch (err) {
		console.log('Error logging in with OAuth2 user', err);
	}
	throw redirect(303, '/');
};

async function getUserData(access_token: string) {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
	);
	const data = await response.json();
	console.log('Sub: ', data.sub);
}
