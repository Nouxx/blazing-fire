import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { routes } from '$lib/types/routes';

export const load: PageServerLoad = async ({ parent, locals }) => {
	// todo: create a function for the redirect logic
	await parent();
	const { session, user } = locals;
	if (!session) {
		redirect(303, routes.notSignedIn);
	}
	return { session, user };
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
