import { redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import { routes } from '$lib/types/routes';

export const redirectIfSession = async (session: Session | null) => {
	if (session) {
		redirect(303, routes.alreadySignedIn);
	}
};

export const redirectIfNoSession = async (session: Session | null) => {
	if (!session) {
		redirect(303, routes.notSignedIn);
	}
};
