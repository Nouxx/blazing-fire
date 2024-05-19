import { createServerClient } from '@supabase/ssr';

import type { PostgrestError } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import type { Database } from '$lib/database/generated-types';

const supabaseCookiesOptions = {
	path: '/',
	secure: true
} as const;

export type SupabaseResponse<T> = {
	data: T | null;
	error: PostgrestError | null;
};

export class Supabase {
	public static createClient(event: RequestEvent, url: string, anon_key: string) {
		return createServerClient<Database>(url, anon_key, {
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
		});
	}

	public static toAppError(error: PostgrestError): App.Error {
		return {
			message: error.message,
			code: error.code
		};
	}

	public static handleResponse<T = null>(response: SupabaseResponse<T>) {
		const { data, error } = response;
		if (error) {
			return { data: null, error: Supabase.toAppError(error) };
		}
		return { data, error: null };
	}
}
