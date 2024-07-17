import { createServerClient } from '@supabase/ssr';

import type { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import type { Database } from '$lib/database/generated-types';
import type { RepositoryResponse } from '$lib/types/repositories';

const supabaseCookiesOptions = {
	path: '/',
	secure: true
} as const;

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

	protected static toAppError(error: PostgrestError): App.Error {
		return {
			message: error.message,
			code: error.code
		};
	}

	/**
	 * convert supabase Postgrest response to RepositoryReponse
	 * @param response
	 * @returns
	 */
	public static handleResponse<T>(response: PostgrestSingleResponse<T>): RepositoryResponse<T> {
		const { data, error } = response;
		if (error) {
			return { data, error: Supabase.toAppError(error) };
		}
		return { data, error };
	}
}
