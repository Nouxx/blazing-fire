import type { Locator, Page } from '@playwright/test';

export class NotSignedInPage {
	readonly page: Page;
	readonly goToSignIn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToSignIn = this.page.getByTestId('link');
	}

	async goToSignInPage() {
		await this.goToSignIn.click();
	}
}
