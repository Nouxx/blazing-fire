import type { Locator, Page } from '@playwright/test';

export class MenusPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private readonly createMenuButton: Locator;
	private readonly toggleEditButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = this.page.getByTestId('menu-page');
		this.createMenuButton = this._page.getByTestId('new-menu');
		this.toggleEditButton = this._page.getByTestId('toggle-edit');
	}

	/**
	 * return a locator for the n-th menu
	 * @param nth human index (starting at 1)
	 */
	private nthMenu(nth: number): Locator {
		return this._page.getByTestId('menu').nth(nth - 1);
	}

	async toggleEditionMode() {
		await this.toggleEditButton.click();
	}

	async renameNthMenu(nth: number, newName: string) {
		await this.nthMenu(nth).getByTestId('name-input').fill(newName);
	}

	async saveNthMenu(nth: number) {
		// click on the menu tile to lose focus on the input
		await this.nthMenu(nth).click();
	}

	async createMenu() {
		await this.createMenuButton.click();
	}

	async deleteNthMenu(nth: number) {
		await this.nthMenu(nth).getByTestId('delete').click();
	}
}
