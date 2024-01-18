// https://firebase.google.com/docs/auth/web/redirect-best-practices#handle-signin-independently

const authUri = '/__/auth';
const firebaseAuthDomain = 'https://blazing-fire-456220.firebaseapp.com';

export async function handle({ event, resolve }) {
	console.log(`hook : ${event.url.pathname}`);

	const url = event.url.pathname;

	if (url.startsWith(authUri)) {
		const resource = url.substring(authUri.length);
		const newUrl = firebaseAuthDomain + authUri + resource + event.url.search;
		const proxyUrl = new URL(newUrl);
		console.log('proxyUrl', proxyUrl.toString());
		return await fetch(proxyUrl.toString(), {
			body: event.request.body,
			method: event.request.method,
			headers: event.request.headers
		}).catch((err) => {
			console.log('Could not proxy API request: ', err);
			throw err;
		});
	}
	const response = await resolve(event);
	return response;
}
