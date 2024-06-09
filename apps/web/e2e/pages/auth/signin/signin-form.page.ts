import type { Locator, Page } from '@playwright/test';

export class SignInPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly signUpLink: Locator;
	public readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = this.page.getByTestId('sign-in-form');
		this.emailInput = this._page.getByTestId('email');
		this.passwordInput = this._page.getByTestId('password');
		this.submitButton = this._page.getByTestId('submit');
		this.signUpLink = this._page.getByTestId('link-to-signup');
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
