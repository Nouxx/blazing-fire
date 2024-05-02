import type { Locator, Page } from '@playwright/test';

export class SignUpSuccessPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private readonly linkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = page.getByTestId('sign-up-success');
		this.linkButton = this._page.getByTestId('link-to-home');
	}

	async goToHome() {
		await this.linkButton.click();
	}
}
