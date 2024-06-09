import type { Locator, Page } from '@playwright/test';

export class AlreadySignedInErrorPage {
	private readonly page: Page;
	private readonly linkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.linkButton = this.page.getByTestId('link-to-account');
	}

	async followLink() {
		await this.linkButton.click();
	}
}
