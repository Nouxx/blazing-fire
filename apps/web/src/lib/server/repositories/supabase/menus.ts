import { Supabase } from '$lib/server/supabase';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MenuRepository } from '$lib/server/repositories/menus';
import type { Database } from '$lib/database/generated-types';
import type { Menu } from '$lib/types/menu';

export class SupabaseMenuRepository implements MenuRepository {
	private readonly tableName = 'menus';
	private readonly idColumn = 'id';
	private readonly userIdColumn = 'user_id';

	private supabase: SupabaseClient<Database>;

	constructor(client: SupabaseClient<Database>) {
		this.supabase = client;
	}

	public async listMenusForUser(userId: string) {
		const response = await this.supabase
			.from(this.tableName)
			.select('name, id')
			.eq(this.userIdColumn, userId);
		return Supabase.handleResponse<Menu[]>(response);
	}

	public async createMenuForUser(userId: string, menuName: string) {
		const response = await this.supabase
			.from(this.tableName)
			.insert({ name: menuName, [this.userIdColumn]: userId });
		return Supabase.handleResponse(response);
	}

	public async renameMenu(name: string, menuId: string) {
		const response = await this.supabase
			.from(this.tableName)
			.update({ name: name })
			.eq(this.idColumn, menuId);
		return Supabase.handleResponse(response);
	}

	public async deleteMenu(menuId: string) {
		const response = await this.supabase.from(this.tableName).delete().eq(this.idColumn, menuId);
		return Supabase.handleResponse(response);
	}
}