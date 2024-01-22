import { error, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	signOut: async ({ locals: { supabase } }) => {
		console.log('FormAction signOut()')
		const { error: err } = await supabase.auth.signOut();

		if (err) {
			throw error(500, 'Something went wrong logging you out.');
		}
		throw redirect(303, '/');
	}
};
