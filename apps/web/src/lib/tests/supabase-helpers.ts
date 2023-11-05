import type { SupabaseClient } from '@supabase/supabase-js';

function createFakeAsyncFunction<T>(value: T, reject = false): () => Promise<T> {
	return async () => {
		if (reject) {
			throw value;
		}
		return value;
	};
}

export function createFakeAuthSupabaseClient<T>(propertyName: string, response: T, reject = false) {
	return {
		auth: {
			[propertyName]: createFakeAsyncFunction<T>(response, reject)
		}
	} as unknown as SupabaseClient;
}
