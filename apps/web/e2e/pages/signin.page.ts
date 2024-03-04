import type { Locator, Page } from '@playwright/test';

export class SignInPage {
	readonly page: Page;
	private readonly pageLocator: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageLocator = page.getByTestId('sign-in-form');
		this.emailInput = this.pageLocator.getByTestId('email');
		this.passwordInput = this.pageLocator.getByTestId('password');
		this.submitButton = this.pageLocator.getByTestId('submit');
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async submitForm() {
		await this.submitButton.click();
	}
}
