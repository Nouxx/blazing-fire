export async function handle({ event, resolve }) {
	console.log(`hook trigrered by '${event.url.pathname}'`);
    // console.log(`headers from hook: `, event.cookies.get('idToken'))
	return await resolve(event);
}
