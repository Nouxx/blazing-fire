import type { Locator, Page } from '@playwright/test';

export class SignUpSuccessPage {
	private readonly page: Page;
	private readonly pageLocator: Locator;
	private readonly linkButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageLocator = page.getByTestId('sign-up-success');
		this.linkButton = this.pageLocator.getByTestId('link');
	}

	async goToHome() {
		await this.linkButton.click();
	}
}
