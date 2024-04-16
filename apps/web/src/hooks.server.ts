import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/database/types';
import { routes } from '$lib/types/routes';
import type { SupabaseClient, User } from '@supabase/supabase-js';

// move all this sh*t to lib?
const supabaseCookiesOptions = {
	path: '/',
	secure: true
};

const resolveOptions = {
	filterSerializedResponseHeaders(name: string) {
		return name === 'content-range';
	}
};

export const isPreloadEvent = (url: string): boolean => {
	return url.includes('__data.json?');
};

export const isProtectedRoute = (routeId: string): boolean => {
	return routeId.startsWith('/(app)');
};

export const getUser = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.getUser();
	if (data.user === null || error) {
		console.error(error);
		return null;
	}
	return data.user;
};

export const getSession = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error(error);
		return null;
	}
	return data.session;
};

export const getSessionForUser = async (supabase: SupabaseClient, user: User | null) => {
	if (!user) {
		return null;
	}
	return await getSession(supabase);
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

	// prevent the cookies API to be triggered after the response is sent
	const user = await getUser(event.locals.supabase);
	const session = await getSessionForUser(event.locals.supabase, user);

	// unit test here, we need to ensure that locals are updated everytime!
	event.locals.session = session;
	event.locals.user = user;

	if (isPreloadEvent(event.request.url)) {
		return resolve(event, resolveOptions);
	}

	if (!event.route.id) {
		return resolve(event, resolveOptions);
	}

	if (!isProtectedRoute(event.route.id)) {
		return resolve(event, resolveOptions);
	}

	if (!session) {
		redirect(302, routes.notSignedIn);
	}

	return resolve(event, resolveOptions);
};
