import { fail, type Actions, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		// todo: return the error properly to the user in the signin screen
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				console.log('Invalid credentials');
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}
		throw redirect(303, '/home');
	}
};
