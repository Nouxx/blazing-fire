import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { AccountPage } from './pages/account.page';
import { HomePage } from './pages/home.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';
import { AlreadySignedInErrorPage } from './pages/error/already-signed-in.page';

test('A user can sign in', async ({ page, context }) => {
	const landingPage = new LandingPage(page);
	const signInPage = new SignInPage(page);
	const accountPage = new AccountPage(page);
	const alreadySignedInPage = new AlreadySignedInErrorPage(page);
	const notSignedInPage = new NotSignedInErrorPage(page);
	const secondTab = await context.newPage();
	const accountPageForSecondTab = new AccountPage(secondTab);

	await test.step('Go to Sign In page', async () => {
		await page.goto('/');
		await expect(page).toHaveScreenshot('landing.png');
		await landingPage.goToApp();
		await expect(page).toHaveScreenshot('not-signed-in.png');
		await notSignedInPage.followLink();
		await expect(page).toHaveScreenshot('sign-in.png');
	});

	await test.step('Fill the form with wrong credentials', async () => {
		await signInPage.fillForm('me@mail.com', 'passwordKo');
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot('sign-in-invalid.png');
	});

	await test.step('Fill the form with correct credentials', async () => {
		await signInPage.fillForm('me@mail.com', 'qwerty123');
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot('home-signed-in.png');
	});

	await test.step('Go to the Sign in page', async () => {
		await page.goto('/auth/signin');
		await expect(page).toHaveScreenshot('already-signed-in.png');
		await alreadySignedInPage.followLink();
		await expect(page).toHaveScreenshot('my-account.png');
	});

	await test.step('Go to the Sign up page', async () => {
		await page.goto('/auth/signup');
		await expect(page).toHaveScreenshot('already-signed-in.png');
		await alreadySignedInPage.followLink();
		await expect(page).toHaveScreenshot('my-account.png');
	});

	await test.step('Open a new tab on the Account page', async () => {
		await secondTab.goto('/account');
		await expect(secondTab).toHaveScreenshot('my-account.png');
	});

	await test.step('Logout in the first tab', async () => {
		await accountPage.logout();
		await expect(page).toHaveScreenshot('landing.png');
	});

	await test.step('Go to homepage in the second tab', async () => {
		await accountPageForSecondTab.goBackToHomePage();
		await expect(secondTab).toHaveScreenshot('not-signed-in.png');
	});

	await test.step('Go to homepage and account from the first tab', async () => {
		await landingPage.goToApp();
		await expect(page).toHaveScreenshot('not-signed-in.png');
		await page.goto('/home');
		await expect(page).toHaveScreenshot('not-signed-in.png');
		await page.goto('/account');
		await expect(page).toHaveScreenshot('not-signed-in.png');
	});
});

test(`A user can't acccess protected pages without cookies`, async ({ page, context }) => {
	const landingPage = new LandingPage(page);
	const notSignedInPage = new NotSignedInErrorPage(page);
	const signInPage = new SignInPage(page);
	const homePage = new HomePage(page);

	await test.step('Go to sign in page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await notSignedInPage.followLink();
	});

	await test.step('Sign in', async () => {
		await signInPage.fillForm('me@mail.com', 'qwerty123');
		await signInPage.submitForm();
		await expect(page).toHaveScreenshot('home-signed-in.png');
	});

	await test.step('Clear the cookies and go to account page', async () => {
		await context.clearCookies();
		await homePage.goToAccountPage();
		await expect(page).toHaveScreenshot('not-signed-in.png');
	});
});
