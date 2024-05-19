import { error, fail } from '@sveltejs/kit';
import { redirectIfNoSession } from '$lib/server/auth';
import { getStringFromFormValue } from '$lib/forms/form-input';
import { MenuService } from '$lib/server/services/menu.service';
import { SupabaseMenuRepository } from '$lib/server/repositories/supabase/menus';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();

	const { session, user, supabase } = locals;

	redirectIfNoSession(session);

	if (!user) {
		error(500, { message: 'no user', name: 'NoUserError' });
	}

	const menuRepository = new SupabaseMenuRepository(supabase);
	const menuService = new MenuService(menuRepository);
	const response = await menuService.listMenusForUser(user.id);

	if (response.error) {
		error(500, response.error);
	}

	return { menus: response.data ?? [] };
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

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.createNewMenuForUser(user.id);

		if (response.error) {
			fail(500, { message: response.error.message });
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

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.renameMenu(name, menuId);

		if (response.error) {
			fail(500, { message: response.error.message, name });
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

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.deleteMenu(menuId);

		if (response.error) {
			error(500, response.error.message);
		}
	}
} satisfies Actions;
