import type { APIRequestContext, Locator, Page } from '@playwright/test';

/**
 * reference: https://github.com/inbucket/inbucket/wiki/REST-GET-message
 */
type InbucketMail = {
	body: {
		text: string;
	};
};

/**
 * reference: https://github.com/inbucket/inbucket/wiki/REST-GET-mailbox
 */
type InbucketMailboxItem = {
	id: string;
	'posix-millis': number;
};

export class SignUpFormPage {
	private readonly page: Page;
	private readonly pageLocator: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly submitButton: Locator;
	private readonly inbucketUrl: string;

	constructor(page: Page) {
		this.page = page;
		this.pageLocator = page.getByTestId('sign-up-form');
		this.emailInput = this.pageLocator.getByTestId('email');
		this.passwordInput = this.pageLocator.getByTestId('password');
		this.submitButton = this.pageLocator.getByTestId('submit');
		this.inbucketUrl = 'http://127.0.0.1:54324';
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async submitForm() {
		await this.submitButton.click();
	}

	/**
	 * fetch the confirmation link of the latest email sent to the provided mailbox
	 * @param request
	 * @param mailbox
	 */
	async fetchConfirmationLink(request: APIRequestContext, mailbox: string): Promise<string> {
		const fetchMailboxResponse = await request.get(`${this.inbucketUrl}/api/v1/mailbox/${mailbox}`);
		const mails: InbucketMailboxItem[] = await fetchMailboxResponse.json();
		const mostRecentEmail: InbucketMailboxItem = mails.reduce(
			(accumulator: InbucketMailboxItem, current: InbucketMailboxItem) =>
				accumulator['posix-millis'] > current['posix-millis'] ? accumulator : current
		);
		const fetchMailResponse = await request.get(
			`${this.inbucketUrl}/api/v1/mailbox/${mailbox}/${mostRecentEmail.id}`
		);
		const mail: InbucketMail = await fetchMailResponse.json();
		const linkRegExpMatch = mail.body.text.match(/(http.*)(?= \))/g);
		if (linkRegExpMatch === null) {
			throw 'No confirmation link matched';
		}
		return linkRegExpMatch[0];
	}
}
