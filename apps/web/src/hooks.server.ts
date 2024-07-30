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

const getUser = async (supabase: SupabaseClient) => {
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

const getSession = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error('getSession', error);
		return null;
	}
	return data.session;
};

async function getSessionForUser(supabase: SupabaseClient, user: User | null) {
	if (!user) {
		return null;
	}
	return await getSession(supabase);
}

function sanitizeSupabaseInputs(url: string | undefined, anonKey: string | undefined) {
	if (!url || url === '') {
		throw new Error(`SUPABASE_URL has not been provided`);
	}
	if (!anonKey || anonKey === '') {
		throw new Error(`SUPABASE_ANON_KEY has not been provided`);
	}
	return {
		supabaseUrl: url,
		supabaseAnonKey: anonKey
	};
}

export const handle: Handle = async ({ event, resolve }) => {
	const { supabaseUrl, supabaseAnonKey } = sanitizeSupabaseInputs(
		env.SUPABASE_URL,
		env.SUPABASE_ANON_KEY
	);
	event.locals.supabase = Supabase.createClient(event, supabaseUrl, supabaseAnonKey);

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
