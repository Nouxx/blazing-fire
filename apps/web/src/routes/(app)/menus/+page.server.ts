import type { Actions, PageServerLoad } from './$types';
import { redirectIfNoSession } from '$lib/server/auth';
import { error, fail } from '@sveltejs/kit';
import { getStringFromFormValue } from '$lib/forms/form-input';

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

export const actions = {
	createMenu: async ({ locals }) => {
		const { session, user, supabase } = locals;

		if (!session || !user) {
			error(401);
		}

		if (!user) {
			error(500, { message: 'no user', name: 'NoUserError' });
		}

		const { error: pgError } = await supabase
			.from('menus')
			.insert({ name: 'My New Menu', user_id: user.id });

		if (pgError) {
			fail(500, { message: pgError.message });
		}
	},
	renameMenu: async ({ locals, request }) => {
		const { session, user, supabase } = locals;

		if (!session || !user) {
			error(401);
		}

		const formData = await request.formData();
		const name = getStringFromFormValue(formData.get('name'));
		const menuId = getStringFromFormValue(formData.get('id'));

		if (!name || !null) {
			fail(400, { message: 'Missing inputs', name });
		}

		const { error: pgError } = await supabase
			.from('menus')
			.update({ name: name })
			.eq('id', menuId)
			.eq('user_id', user.id)
			.select();

		if (pgError) {
			fail(500, { message: pgError.message, name });
		}

		return { name, success: true };
	},
	deleteMenu: async ({ locals, request }) => {
		const { session, user, supabase } = locals;

		if (!session || !user) {
			error(401);
		}

		const formData = await request.formData();
		const menuId = getStringFromFormValue(formData.get('id'));

		const { error: pgError } = await supabase
			.from('menus')
			.delete()
			.eq('id', menuId)
			.eq('user_id', user.id);

		if (pgError) {
			error(500, { message: pgError.message, name: 'DbError' });
		}
	}
} satisfies Actions;
