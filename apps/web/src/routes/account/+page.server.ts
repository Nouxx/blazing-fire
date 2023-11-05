import { error, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	signOut: async ({ locals: { supabase } }) => {
		const { error: err } = await supabase.auth.signOut();

		if (err) {
			error(500, 'Something went wrong logging you out.');
		}

		redirect(303, '/');
	}
};
