import { SupabaseMenuRepository } from '$lib/server/repositories/supabase/menus';
import { MenuService } from '$lib/server/services/menu.service';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals }) => {
	const { session, user, supabase } = locals;

	if (!session || !user) {
		error(401);
	}

	const { name, id } = await request.json();

	if (!name || !id) {
		error(400, { message: 'Missing inputs' });
	}

	if (id === 33) {
		error(400, { message: 'NTM' });
	}

	const supabaseRepo = new SupabaseMenuRepository(supabase);
	const menuService = new MenuService(supabaseRepo);
	const response = await menuService.renameMenu(name, id);

	await new Promise((resolve) => setTimeout(resolve, 2000));

	if (response.error) {
		error(500, response.error);
	}

	return json({ name });
};
