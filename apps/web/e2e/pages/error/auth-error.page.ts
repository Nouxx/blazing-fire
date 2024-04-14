import type { Locator, Page } from '@playwright/test';

export class AnyAuthErrorPage {
	private readonly page: Page;
	private readonly linkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.linkButton = this.page.getByTestId('link');
	}

	async followLink() {
		await this.linkButton.click();
	}
}
