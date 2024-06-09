import type { MenuRepository } from '$lib/server/repositories/menus';

export class MenuService {
	private menuRepository: MenuRepository;

	constructor(menuRepository: MenuRepository) {
		this.menuRepository = menuRepository;
	}

	public listMenusForUser(userId: string) {
		return this.menuRepository.listMenusForUser(userId);
	}

	public createNewMenuForUser(userId: string) {
		const newMenuName = 'My New Menu';
		return this.menuRepository.createMenuForUser(userId, newMenuName);
	}

	public renameMenu(name: string, menuId: string) {
		return this.menuRepository.renameMenu(name, menuId);
	}

	public deleteMenu(menuId: string) {
		return this.menuRepository.deleteMenu(menuId);
	}
}
