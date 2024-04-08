import { test, expect } from '@playwright/test';
import { HeaderPage } from './pages/shared/header.page';
import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin.page';
import { AccountPage } from './pages/account.page';

test('A user can sign in', async ({ page }) => {
	// Setup
	const headerPage = new HeaderPage(page);
	const landingPage = new LandingPage(page);
	const signInPage = new SignInPage(page);
	const accountPage = new AccountPage(page);

	// Go to sign in page
	await page.goto('/');
	await expect(page).toHaveScreenshot('landing.png');
	await landingPage.goToApp();
	await expect(page).toHaveScreenshot('not-signed-in.png');
	await headerPage.followLink();
	await expect(page).toHaveScreenshot('sign-in.png');

	// Edge case: wrong credentials
	await signInPage.fillForm('me@mail.com', 'passwordKo');
	await signInPage.submitForm();
	await expect(page).toHaveScreenshot('sign-in-invalid.png');

	// Happy path: sign is successfull
	await signInPage.fillForm('me@mail.com', 'qwerty123');
	await signInPage.submitForm();
	await expect(page).toHaveScreenshot('home-signed-in.png');

	// Logout
	await headerPage.followLink();
	await expect(page).toHaveScreenshot('my-account.png');
	await accountPage.logout();
	await expect(page).toHaveScreenshot('landing.png');
});
