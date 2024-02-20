import type {
	AuthApiError,
	AuthTokenResponsePassword,
	SupabaseClient
} from '@supabase/supabase-js';

type SupabaseResponses = AuthTokenResponsePassword | AuthApiError;

export function createFakeSupabaseFunction<T extends SupabaseResponses>(response: T) {
	return async () => {
		return new Promise<T>((resolve) => {
			resolve(response);
		});
	};
}

export function createFakeAuthSupabaseClient<T extends SupabaseResponses>(
	supabaseResponse: T
): SupabaseClient {
	return {
		auth: {
			signInWithPassword: createFakeSupabaseFunction<T>(supabaseResponse)
		}
	} as unknown as SupabaseClient;
}
