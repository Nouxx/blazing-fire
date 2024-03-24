import type { Session, SupabaseClient } from '@supabase/supabase-js';

export function createFakeLocalsWithSupabase(supabase: SupabaseClient) {
	return {
		supabase
	} as unknown as App.Locals;
}

export function createFakeLocalsWithSession(fakeSession: Session) {
	const fakeSessionFunction = async () => {
		return fakeSession;
	};
	return {
		getSession: fakeSessionFunction
	} as unknown as App.Locals;
}
