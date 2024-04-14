import type { Locator, Page } from '@playwright/test';

export class LandingPage {
	private readonly page: Page;
	private readonly goToAppButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToAppButton = this.page.getByTestId('link');
	}

	async goToApp() {
		await this.goToAppButton.click();
	}
}
