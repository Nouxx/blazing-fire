import { error, type ActionFailure } from '@sveltejs/kit';
import {
	createFormActionsFailureResponse,
	createFormActionsSuccessResponse,
	getString,
	type FormActionsFailureResponse,
	type FormActionsSuccessResponse
} from '$lib/server/form';
import { MenuService } from '$lib/server/services/menu.service';
import { SupabaseMenuRepository } from '$lib/server/repositories/supabase/menus';
import type { Actions, PageServerLoad } from './$types';
import type { Menu } from '$lib/types/menu';

export const load: PageServerLoad = async ({ parent, locals }) => {
	await parent();

	const { user, supabase } = locals;

	// todo: handle error
	if (!user) {
		error(500);
	}

	const menuRepository = new SupabaseMenuRepository(supabase);
	const menuService = new MenuService(menuRepository);

	const response = await menuService.listMenusForUser(user.id);

	if (response.error) {
		error(500, response.error);
	}

	return { menus: response.data ?? [] };
};

type MenuPageActionsName = 'createMenu' | 'renameMenu' | 'deleteMenu';

type MenuPageResponseData = Menu | null;

type MenuPageFormActionsFailure = FormActionsFailureResponse<
	MenuPageActionsName,
	MenuPageResponseData
>;

type MenuPageFormActionsSuccess = FormActionsSuccessResponse<
	MenuPageActionsName,
	MenuPageResponseData
>;

export const actions = {
	createMenu: async ({ locals }) => {
		const { user, supabase } = locals;

		if (!user) {
			return createFormActionsFailureResponse(500, {
				action: 'createMenu',
				error: { message: 'No User' }
			});
		}

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.createNewMenuForUser(user.id);

		if (response.error) {
			return createFormActionsFailureResponse(500, {
				action: 'createMenu',
				error: { message: response.error.message }
			});
		}

		return createFormActionsSuccessResponse('createMenu', null);
	},
	renameMenu: async ({ locals, request }) => {
		const { user, supabase } = locals;

		if (!user) {
			return createFormActionsFailureResponse(500, {
				action: 'renameMenu',
				error: { message: 'No User' }
			});
		}

		const formData = await request.formData();
		const name = getString(formData.get('name'));
		const menuId = getString(formData.get('id'));

		if (!name || !menuId) {
			return createFormActionsFailureResponse(400, {
				action: 'renameMenu',
				error: { message: 'Missing inputs' },
				data: { name, id: Number(menuId) }
			});
		}

		// // fake error
		// await new Promise((resolve) => setTimeout(resolve, 1000));
		// return fail(400, {
		// 	error: { message: 'Fake error' },
		// 	data: { name, id: Number(menuId) }
		// });

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.renameMenu(name, menuId);

		if (response.error) {
			return createFormActionsFailureResponse(500, {
				action: 'renameMenu',
				error: { message: String(response.error) },
				data: { name, id: Number(menuId) }
			});
		}

		return createFormActionsSuccessResponse('renameMenu', { name, id: Number(menuId) });
	},
	deleteMenu: async ({ locals, request }) => {
		const { user, supabase } = locals;

		if (!user) {
			return createFormActionsFailureResponse(500, {
				action: 'deleteMenu',
				error: { message: 'No User' }
			});
		}

		const formData = await request.formData();
		const menuId = getString(formData.get('id'));

		if (!menuId) {
			return createFormActionsFailureResponse(400, {
				action: 'deleteMenu',
				error: { message: 'Missing menu id' }
			});
		}

		const supabaseRepo = new SupabaseMenuRepository(supabase);
		const menuService = new MenuService(supabaseRepo);
		const response = await menuService.deleteMenu(menuId);

		if (response.error) {
			return createFormActionsFailureResponse(500, {
				action: 'deleteMenu',
				error: { message: String(response.error) }
			});
		}

		return createFormActionsSuccessResponse('deleteMenu', null);
	}
} satisfies Actions<MenuPageFormActionsSuccess | ActionFailure<MenuPageFormActionsFailure>>;
