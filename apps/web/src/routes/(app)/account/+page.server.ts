import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { routes } from '$lib/const/routes';
import { redirectIfNoSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session, user } = locals;
	redirectIfNoSession(session);
	return { user };
};

export const actions: Actions = {
	signOut: async ({ locals: { supabase } }) => {
		const { error: _error } = await supabase.auth.signOut();

		if (_error) {
			error(500, { name: 'Something went wrong logging you out.', message: 'LogOutError' });
		}

		redirect(303, routes.landing);
	}
};
