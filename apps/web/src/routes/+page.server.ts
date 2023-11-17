import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';

export const actions = {
	googleSignIn: async () => {
		const redirectURL = `${HOST}/auth`;
		const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL);
		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
			prompt: 'consent'
		});
		throw redirect(302, authorizeUrl);
	}
};

export function load({ cookies }) {
	const token = cookies.get('idToken');
	return { token };
}
