import type { Locator, Page } from '@playwright/test';

export class HeaderPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private readonly linkButton: Locator;
	private readonly myAccountLinkButton: Locator;
	private readonly signInLinkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = page.getByTestId('header');
		this.linkButton = this._page.getByTestId('link');
	}

	async followLink() {
		await this.linkButton.click();
	}
}
