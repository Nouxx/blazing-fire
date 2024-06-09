import type { Locator, Page } from '@playwright/test';

export class ConfirmationModalPage {
	private readonly page: Page;
	private readonly _page: Locator;
	private readonly confirmButton: Locator;
	private readonly cancelButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this._page = this.page.getByTestId('confirmation-modal');
		this.confirmButton = this._page.getByTestId('confirm');
		this.cancelButton = this._page.getByTestId('close');
	}

	async confirm() {
		await this.confirmButton.click();
	}

	async cancel() {
		await this.cancelButton.click();
	}
}
