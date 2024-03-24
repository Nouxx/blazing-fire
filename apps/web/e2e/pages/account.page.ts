import type { Locator, Page } from '@playwright/test';

export class AccountPage {
	readonly page: Page;
	readonly logoutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.logoutButton = page.getByTestId('logout');
	}

	async logout() {
		await this.logoutButton.click();
	}
}
