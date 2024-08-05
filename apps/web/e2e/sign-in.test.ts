import { test, expect } from '@playwright/test';

import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { AccountPage } from './pages/account.page';
import { HomePage } from './pages/home.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';
import { AlreadySignedInErrorPage } from './pages/error/already-signed-in.page';

import { testUsers } from './data/users';
import { SnapshotHandler } from './utils/snapshot-handler';

let landingPage: LandingPage;
let signInPage: SignInPage;
let accountPage: AccountPage;
let homePage: HomePage;
let alreadySignedInPage: AlreadySignedInErrorPage;
let notSignedInPage: NotSignedInErrorPage;

test.beforeEach(async ({ page }) => {
	landingPage = new LandingPage(page);
	signInPage = new SignInPage(page);
	accountPage = new AccountPage(page);
	homePage = new HomePage(page);
	alreadySignedInPage = new AlreadySignedInErrorPage(page);
	notSignedInPage = new NotSignedInErrorPage(page);

	await test.step('Go to the sign in page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await notSignedInPage.followLink();
	});
});

test('A user can sign in', async ({ page, context }) => {
	const TEST_ID = 'sign-in';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_SIGN_IN = 'The sign in page in its init state';
	const SNAP_SIGN_IN_INVALID = 'The sign form with an invalid credentials error';
	const SNAP_HOMEPAGE = 'The home page when signed in';
	const SNAP_ALREADY_SIGNED_IN = 'The already signed in page';
	const SNAP_NOT_SIGNED_IN = 'The not signed in page';
	const SNAP_MY_ACCOUNT = 'The account page';
	const SNAP_LANDING = 'The landing page';

	const secondTab = await context.newPage();
	const accountPageForSecondTab = new AccountPage(secondTab);

	await test.step('Try to click on the sign in button', async () => {
		await expect(signInPage.submitButton).toBeDisabled();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_SIGN_IN));
	});

	await test.step('Submit the form with a correct mail and a wrong password', async () => {
		await signInPage.fillForm(testUsers.registered.mail, 'incorrect-password');
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_SIGN_IN_INVALID));
	});

	await test.step('Fill the form with correct credentials', async () => {
		await signInPage.fillForm(testUsers.registered.mail, testUsers.registered.password);
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_HOMEPAGE));
	});

	await test.step('Go to the Sign in page', async () => {
		await page.goto('/auth/signin');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ALREADY_SIGNED_IN));
		await alreadySignedInPage.followLink();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_MY_ACCOUNT));
	});

	await test.step('Go to the Sign up page', async () => {
		await page.goto('/auth/signup');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ALREADY_SIGNED_IN));
		await alreadySignedInPage.followLink();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_MY_ACCOUNT));
	});

	await test.step('Open a new tab on the Account page', async () => {
		await secondTab.goto('/account');
		await expect(secondTab).toHaveScreenshot(sh.getFileName(SNAP_MY_ACCOUNT));
	});

	await test.step('Logout in the first tab', async () => {
		await accountPage.logout();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_LANDING));
	});

	await test.step('Go to the homepage in the second tab', async () => {
		await accountPageForSecondTab.goBackToHomePage();
		await expect(secondTab).toHaveScreenshot(sh.getFileName(SNAP_NOT_SIGNED_IN));
	});

	await test.step('Go to homepage and account from the first tab', async () => {
		await landingPage.goToApp();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_NOT_SIGNED_IN));
		await page.goto('/home');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_NOT_SIGNED_IN));
		await page.goto('/account');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_NOT_SIGNED_IN));
	});
});

test(`A user can't acccess protected pages without cookies`, async ({ page, context }) => {
	const TEST_ID = 'sign-in-without-cookies';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_HOME_SIGNED_IN = 'The home page when signed in';
	const SNAP_NOT_SIGNED_IN = 'The not signed in page';

	await test.step('Sign in', async () => {
		await signInPage.fillForm(testUsers.registered.mail, testUsers.registered.password);
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_HOME_SIGNED_IN));
	});

	await test.step('Clear the cookies and go to account page', async () => {
		await context.clearCookies();
		await homePage.goToAccountPage();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_NOT_SIGNED_IN));
	});
});
