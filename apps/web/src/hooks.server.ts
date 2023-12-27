// https://firebase.google.com/docs/auth/web/redirect-best-practices#handle-signin-independently

export async function handle({ event, resolve }) {
    console.log(`hook : ${event.url.pathname}`)
	if (event.url.pathname.startsWith('/__/auth')) {
		console.log('__AUTH');
	}

	const response = await resolve(event);
	return response;
}
