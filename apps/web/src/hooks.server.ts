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
	console.log('Server Hook!', event.request.url);
	
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
		// .session.user seems to match .user
		return { session, user };
	};

	// there's maybe a better way
	const isPreloadRequest = event.request.url.includes('__data.json');
	if (isPreloadRequest) {
		return resolve(event, resolveOptions);
	}

	if (!event.route.id) {
		return resolve(event, resolveOptions);
	}

	const isPathProtectedByAuth = event.route.id.includes('(protected)');

	if (!isPathProtectedByAuth) {
		return resolve(event, resolveOptions);
	}

	const session = await event.locals.getUserSession();
	if (!session.user) {
		redirect(302, '/auth/signin/error');
	}

	return resolve(event, resolveOptions);
};
