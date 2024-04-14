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

	const getUserAndSession = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (user === null) {
			return { session: null, user: null };
		}
		if (error) {
			return { session: null, user: null };
		}
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession(); // todo: catch error
		return { session, user };
	};

	// prevent the cookies API to be triggered after the response is sent
	const { session, user } = await getUserAndSession();

	event.locals.session = session;
	event.locals.user = user;

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

	if (!session) {
		// todo: enum for error routes
		redirect(302, '/error/not-signed-in');
	}

	return resolve(event, resolveOptions);
};
