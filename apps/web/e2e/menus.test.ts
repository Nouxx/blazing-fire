import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';
import { HomePage } from './pages/home.page';
import { MenusPage } from './pages/menus.page';

test('A user can rename a menu', async ({ page }) => {
	const landingPage = new LandingPage(page);
	const authErrorPage = new NotSignedInErrorPage(page);
	const signInPage = new SignInPage(page);
	const homePage = new HomePage(page);
	const menusPage = new MenusPage(page);

	await test.step('Sign in and go to the Menu page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await authErrorPage.followLink();
		await signInPage.fillForm('me@mail.com', 'qwerty123');
		await signInPage.submitForm();
		await homePage.goToMenuPage();
		await expect(page).toHaveScreenshot('one-menu.png');
	});

	await test.step('Rename the first menu', async () => {
		await menusPage.triggerRenameModeForNthMenu(1);
		await expect(page).toHaveScreenshot('renaming-first-menu.png');
		await menusPage.renameNthMenu(1, 'My New Menu Name');
		await menusPage.saveNthMenu(1);
		await expect(page).toHaveScreenshot('first-menu-saved.png');
	});
});
