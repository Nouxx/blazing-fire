import type { Locator, Page } from '@playwright/test';

export class HeaderPage {
	readonly page: Page;
	readonly linkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.linkButton = page.getByTestId('header-link');
	}

	async followLink() {
		await this.linkButton.click();
	}
}
