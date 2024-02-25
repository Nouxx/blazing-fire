import type {
	AuthApiError,
	AuthError,
	AuthTokenResponsePassword,
	SupabaseClient
} from '@supabase/supabase-js';

type SupabaseResponses = AuthTokenResponsePassword | AuthApiError | AuthError | unknown;

function createFakeAsyncFunction<T>(value: T, reject = false): () => Promise<T> {
	return async () => {
		if (reject) {
			throw value;
		}
		return value;
	};
}

// todo: refactor the others tests with this function
export function createFakeAuthSupabaseClientV2<T>(propertyName: string, response: T, reject = false) {
	return {
		auth: {
			[propertyName]: createFakeAsyncFunction<T>(response, reject)
		}
	} as unknown as SupabaseClient;
}

export function createFakeSupabaseResponse<T extends SupabaseResponses>(response: T) {
	return async () => {
		return response;
	};
}

export function createFakeAuthSupabaseClient<T extends SupabaseResponses>(
	supabaseResponse: T
): SupabaseClient {
	return {
		auth: {
			signInWithPassword: createFakeSupabaseResponse<T>(supabaseResponse),
			getSession: createFakeSupabaseResponse<T>(supabaseResponse),
			signOut: createFakeSupabaseResponse<T>(supabaseResponse),
			exchangeCodeForSession: createFakeSupabaseResponse<T>(supabaseResponse)
		}
	} as unknown as SupabaseClient;
}
