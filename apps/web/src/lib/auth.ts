import { OAuth2Client, type Credentials } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '$env/static/private';
import type { UserDao } from '$lib/types/user';

export const googleAuthClient = new OAuth2Client(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${HOST}/auth`
);

export async function getUserData(access_token: string): Promise<UserDao> {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
	);
	return await response.json();
}

export async function verifyIdToken(token: string) {
	await googleAuthClient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
	// todo: handle error
}

export async function refreshIdToken() {
	return (await googleAuthClient.refreshAccessToken()).credentials.id_token;
	// todo: handle error
}

export async function getTokens(code: string): Promise<Tokens> {
	const getTokenResponse = await googleAuthClient.getToken(code);
	googleAuthClient.setCredentials(getTokenResponse.tokens);
	const credentials = googleAuthClient.credentials;
	return {
		idToken: extractToken('id_token', credentials),
		accessToken: extractToken('access_token', credentials)
	};
}

export type Tokens = {
	idToken: string;
	accessToken: string;
};

function extractToken(tokenType: 'access_token' | 'id_token', credentials: Credentials): string {
	const token = credentials[tokenType];
	if (token === null || token === undefined) {
		throw 'ERROR: could not extract idToken from credentials';
	}
	return token;
}
