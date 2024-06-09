import type { Locator, Page } from '@playwright/test';

export class HomePage {
	private readonly page: Page;
	private readonly goToAccountButton: Locator;
	private readonly goToMenuButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToMenuButton = this.page.getByTestId('link-to-menus');
		this.goToAccountButton = this.page.getByTestId('link-to-account');
	}

	async goToAccountPage() {
		await this.goToAccountButton.click();
	}

	async goToMenuPage() {
		await this.goToMenuButton.click();
	}
}
