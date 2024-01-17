// https://firebase.google.com/docs/auth/web/redirect-best-practices#handle-signin-independently

export async function handle({ event, resolve }) {
	// console.log(`hook : ${event.url.pathname}`);
	const response = await resolve(event);
	return response;
}
