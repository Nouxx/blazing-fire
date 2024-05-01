import type { Handle } from '@sveltejs/kit';
import type { AuthError, SupabaseClient, User } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import type { Database } from '$lib/database/types';
import { redirectIfNoSession } from '$lib/server/auth';

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

function isInvalidClaimError(error: AuthError | null): error is AuthError {
	if (!error) {
		return false;
	}
	const authError = error as AuthError;
	return (
		authError.status === 401 && authError.message.toLocaleLowerCase().includes('invalid claim')
	);
}

export const getUser = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.getUser();
	if (isInvalidClaimError(error)) {
		return null;
	}
	if (data.user === null) {
		return null;
	}
	if (error) {
		console.error('getUser', error);
		return null;
	}
	return data.user;
};

export const getSession = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error('getSession', error);
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
	event.locals.supabase = createServerClient<Database>(
		SUPABASE_URL,
		SUPABASE_ANON_KEY,
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

	redirectIfNoSession(session);

	return resolve(event, resolveOptions);
};
