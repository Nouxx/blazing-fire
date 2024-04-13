import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/database/types';

const supabaseCookiesOptions = {
	path: '/',
	secure: true
};

const resolveOptions = {
	filterSerializedResponseHeaders(name: string) {
		return name === 'content-range';
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	console.log('hook server');
	// createServerClient() is a singleton
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => {
					return event.cookies.get(key);
				},
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, ...supabaseCookiesOptions });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, ...supabaseCookiesOptions });
				}
			}
		}
	);

	event.locals.getUserSession = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return { session, user };
	};

	// prevent the cookies API to be triggered after the response is sent
	const session = await event.locals.getUserSession();

	// Using prefered way to get session and user from locals which is rerun in hooks for every request.
	// This is more secure way compared to gettting the session and user from layout data because layout data are not refreshed everytime.
	// Also it is important to note that server load functions run all at once.

	const isPreloadRequest = event.request.url.includes('__data.json');
	if (isPreloadRequest) {
		return resolve(event, resolveOptions);
	}

	if (!event.route.id) {
		return resolve(event, resolveOptions);
	}

	const isPathProtectedByAuth = event.route.id.includes('(app)');

	if (!isPathProtectedByAuth) {
		return resolve(event, resolveOptions);
	}

	if (!session.user) {
		redirect(302, '/auth/signin/error');
	}

	return resolve(event, resolveOptions);
};
