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
		this.myAccountLinkButton = this._page.getByTestId('link-my-account');
		this.signInLinkButton = this._page.getByTestId('link-sign-in');
	}

	async followLink() {
		await this.linkButton.click();
	}

	async goToMyAccount() {
		await this.myAccountLinkButton.click();
	}

	async goToSignIn() {
		await this.signInLinkButton.click();
	}
}
