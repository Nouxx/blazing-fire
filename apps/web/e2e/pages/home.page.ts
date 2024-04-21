import type { Locator, Page } from '@playwright/test';

export class HomePage {
	private readonly page: Page;
	private readonly goToAccountButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToAccountButton = this.page.getByTestId('link').nth(1);
	}

	async goToAccountPage() {
		await this.goToAccountButton.click();
	}
}
