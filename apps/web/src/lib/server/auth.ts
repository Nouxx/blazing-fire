import { redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import { routes } from '$lib/const/routes';

export const redirectIfSession = (session: Session | null) => {
	if (session) {
		redirect(303, routes.alreadySignedIn);
	}
};

export const redirectIfNoSession = (session: Session | null) => {
	if (!session) {
		redirect(303, routes.notSignedIn);
	}
};
