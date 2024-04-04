import { error, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	signOut: async ({ locals: { supabase } }) => {
		const { error: err } = await supabase.auth.signOut();

		if (err) {
			error(500, { name: 'Something went wrong logging you out.', message: 'LogOutError' });
		}

		redirect(303, '/');
	}
};
