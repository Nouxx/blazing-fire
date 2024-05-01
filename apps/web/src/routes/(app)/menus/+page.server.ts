import type { PageServerLoad } from './$types';
import { redirectIfNoSession } from '$lib/server/auth';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals }) => {
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
	return { menus: data };
};
