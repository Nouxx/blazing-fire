import type { SupabaseClient } from '@supabase/supabase-js';

export function createFakeLocals(supabase: SupabaseClient) {
	return {
		supabase
	} as unknown as App.Locals;
}
