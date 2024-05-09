import type { Locator, Page } from '@playwright/test';

export class MenusPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private createMenuButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = this.page.getByTestId('menu-page');
		this.createMenuButton = this._page.getByTestId('new-menu');
	}

	/**
	 * return a locator for the N-th menu
	 * @param nth human index (starting 1)
	 */
	private nthMenu(nth: number): Locator {
		return this._page.getByTestId('menu').nth(nth - 1);
	}

	async triggerRenameModeForNthMenu(nth: number) {
		await this.nthMenu(nth).getByTestId('rename').click();
	}

	async renameNthMenu(nth: number, newName: string) {
		await this.nthMenu(nth).getByTestId('name-input').fill(newName);
	}

	async saveNthMenu(nth: number) {
		await this.nthMenu(nth).getByTestId('save').click();
	}

	async saveNthMenuWithKeypress(nth: number) {
		await this.nthMenu(nth).getByTestId('name-input').press('Enter');
	}

	async createMenu() {
		await this.createMenuButton.click();
	}

	async deleteMenu(nth: number) {
		await this.nthMenu(nth).getByTestId('delete').click();
	}
}
