import type { Locator, Page } from '@playwright/test';

export class LandingPage {
	readonly page: Page;
	readonly goToAppButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToAppButton = this.page.getByTestId('link');
	}

	async goToApp() {
		await this.goToAppButton.click();
	}
}
