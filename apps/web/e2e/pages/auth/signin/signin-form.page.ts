import type { Locator, Page } from '@playwright/test';

export class SignInPage {
	private readonly page: Page;
	private readonly pageLocator: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly submitButton: Locator;
	private readonly signUpLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageLocator = page.getByTestId('sign-in-form');
		this.emailInput = this.pageLocator.getByTestId('email');
		this.passwordInput = this.pageLocator.getByTestId('password');
		this.submitButton = this.pageLocator.getByTestId('submit');
		this.signUpLink = this.pageLocator.getByTestId('link-to-signup');
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async submitForm() {
		await this.submitButton.click();
	}

	async goToSignUp() {
		await this.signUpLink.click();
	}
}
