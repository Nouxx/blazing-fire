import { test, expect } from '@playwright/test';

import { SignInPage } from './pages/auth/signin/signin-form.page';
import { SignUpFormPage } from './pages/auth/signup/signup-form.page';
import { SignUpSuccessPage } from './pages/auth/signup/signup-success.page';
import { LandingPage } from './pages/landing.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';

import { testUsers } from './data/users';

import { SupabaseTestHelpers } from './utils/supabase-helpers';
import { SnapshotHandler } from './utils/snapshot-handler';

let helpers: SupabaseTestHelpers;

let landingPage: LandingPage;
let signInPage: SignInPage;
let notSignedInPage: NotSignedInErrorPage;
let signUpFormPage: SignUpFormPage;

test.beforeEach(async ({ page }) => {
	// todo: use beforeAll?
	const url = process.env.SUPABASE_URL;
	const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !roleKey) {
		throw `Supabase Test Helper can't be instanciated, provided options: ${JSON.stringify({ url, roleKey })}`;
	}
	helpers = new SupabaseTestHelpers(url, roleKey);

	landingPage = new LandingPage(page);
	signInPage = new SignInPage(page);
	signUpFormPage = new SignUpFormPage(page);
	notSignedInPage = new NotSignedInErrorPage(page);

	await test.step('Go to the Sign Up page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await notSignedInPage.followLink();
		await signInPage.goToSignUp();
	});
});

test.afterEach(async () => {
	await helpers.deleteUserByEmail(testUsers.new.mail);
});

test('Sign up form errors', async ({ page }) => {
	const TEST_ID = 'sign-up-errors';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_WEAK_PASSWORD_ERROR = 'An error when the submitted password is weak';
	const SNAP_INVALID_PASSWORD_ERROR = 'An error when the submitted email is invalid';

	await test.step('Fill the form with a weak password', async () => {
		await signUpFormPage.fillForm('correct@mail.com', 'a');
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_WEAK_PASSWORD_ERROR));
	});

	await test.step('Fill the form with a invalid email', async () => {
		await signUpFormPage.fillForm('incorrect-mail', 'aProperPassword');
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_INVALID_PASSWORD_ERROR));
	});
});

test('Sign up success', async ({ page, request, context }) => {
	const TEST_ID = 'sign-up';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_PENDING = 'The sign up pending page';
	const SNAP_SUCCESS = 'The successful signed up page';
	const SNAP_HOME = 'The home page';
	const SNAP_ERROR = 'The sign up error page';

	const secondTab = await context.newPage();
	const signUpSuccessPage = new SignUpSuccessPage(page);
	let confirmationLink = '';

	await test.step('Fill the form with correct credentials', async () => {
		await signUpFormPage.fillForm(testUsers.new.mail, testUsers.new.password);
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_PENDING));
	});

	await test.step('Follow the confirmation link', async () => {
		confirmationLink = await helpers.fetchConfirmationLink(request, testUsers.new.mail);
		await page.goto(confirmationLink);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_SUCCESS));
	});

	await test.step('Go to homepage', async () => {
		await signUpSuccessPage.goToHome();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_HOME));
	});

	// bug: clicking on the confirmation link twice log you out
	// todo: move this step up once fixed
	await test.step('Reopen the confirmation link in a second tab', async () => {
		secondTab.goto(confirmationLink);
		await expect(secondTab).toHaveScreenshot(sh.getFileName(SNAP_ERROR));
	});
});
