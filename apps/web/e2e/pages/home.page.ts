import type { Locator, Page } from '@playwright/test';

export class HomepagePage {
	readonly page: Page;
	readonly goToSignInButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.goToSignInButton = page.getByTestId('login-navigation').getByTestId('link');
	}

	async goToSignIn() {
		await this.goToSignInButton.click();
	}
}
