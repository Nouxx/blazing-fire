import type { Locator, Page } from '@playwright/test';

export class AccountPage {
	private readonly page: Page;
	private readonly logoutButton: Locator;
	private readonly goBackToHomePageButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.logoutButton = this.page.getByTestId('logout');
		this.goBackToHomePageButton = this.page.getByTestId('link-to-home');
	}

	async logout() {
		await this.logoutButton.click();
	}

	async goBackToHomePage() {
		await this.goBackToHomePageButton.click();
	}
}
