import type { Handle } from '@sveltejs/kit';
import type { AuthError, SupabaseClient, User } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { redirectIfNoSession } from '$lib/server/auth';
import { Supabase } from '$lib/server/supabase';

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
	event.locals.supabase = Supabase.createClient(event, env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

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
