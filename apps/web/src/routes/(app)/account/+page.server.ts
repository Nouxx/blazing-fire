import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();
	const { session, user } = locals;
	if (!session) {
		redirect(303, '/error/not-signed-in');
	}
	return { session, user };
};

export const actions: Actions = {
	signOut: async ({ locals: { supabase } }) => {
		const { error: _error } = await supabase.auth.signOut();

		if (_error) {
			error(500, { name: 'Something went wrong logging you out.', message: 'LogOutError' });
		}

		redirect(303, '/');
	}
};
