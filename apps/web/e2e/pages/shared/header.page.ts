import type { Locator, Page } from '@playwright/test';

export class HeaderPage {
	readonly page: Page;
	private readonly _page: Locator;
	readonly linkButton: Locator;
	readonly myAccountLinkButton: Locator;
	readonly signInLinkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = page.getByTestId('header');
		this.linkButton = this._page.getByTestId('link');
	}

	async followLink() {
		await this.linkButton.click();
	}
}
