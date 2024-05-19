import type { Menu } from '$lib/types/menu';
import type { RepositoryResponse } from '$lib/types/repositories';

export interface MenuRepository {
	listMenusForUser: (userId: string) => Promise<RepositoryResponse<Menu[]>>;
	createMenuForUser: (userId: string, name: string) => Promise<RepositoryResponse>;
	renameMenu: (name: string, menuId: string) => Promise<RepositoryResponse>;
	deleteMenu: (menuId: string) => Promise<RepositoryResponse>;
}
