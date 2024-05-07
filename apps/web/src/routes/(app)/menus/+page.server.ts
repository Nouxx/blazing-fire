import type { PageServerLoad } from './$types';
import { redirectIfNoSession } from '$lib/server/auth';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals, depends }) => {
	depends('menus:load');
	console.log('/menus load function');
	await parent();
	const { session, user, supabase } = locals;
	redirectIfNoSession(session);
	if (!user) {
		error(500, { message: 'no user', name: 'NoUserError' });
	}
	const { data, error: supabaseError } = await supabase
		.from('menus') // todo: enum for table name?
		.select('name, id')
		.eq('user_id', user.id);
	if (supabaseError) {
		error(500, { message: supabaseError.message, name: 'DBError' });
	}
	console.log('data', data);
	return { menus: data };
};

export const actions: Actions = {
	createMenu: async ({ locals }) => {
		const { session, user, supabase } = locals;

		redirectIfNoSession(session);

		if (!user) {
			error(500, { message: 'no user', name: 'NoUserError' });
		}

		await supabase.from('menus').insert({ name: 'My New Menu', user_id: user.id });
	}
};
