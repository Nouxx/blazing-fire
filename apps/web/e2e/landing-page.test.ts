import { test, expect } from '@playwright/test';
import { HeaderPage } from './pages/shared/header.page';
import { HomepagePage } from './pages/home.page';
import { SignInPage } from './pages/signin.page';

test('A user can consult the landing page', async ({ page }) => {
	// Given
	const headerPage = new HeaderPage(page);
	const homepagePage = new HomepagePage(page);
	const signInPage = new SignInPage(page);

	await page.goto('/');
	await expect(page).toHaveScreenshot('landing.png');
	await headerPage.followLink();
	await expect(page).toHaveScreenshot('not-signed-in.png');
	await homepagePage.goToSignIn();
	await expect(page).toHaveScreenshot('sign-in.png');
	await signInPage.fillForm('me@mail.com', 'qwerty123');
	await expect(page).toHaveScreenshot('sign-in-form-filled.png');
	await signInPage.submitForm();
	await expect(page).toHaveScreenshot('home-signed-in.png');
});
