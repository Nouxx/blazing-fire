import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';
import { HomePage } from './pages/home.page';
import { MenusPage } from './pages/menus.page';
import { testUsers } from './data/users';
import { TestHelpers } from './data/helpers';
import { ConfirmationModalPage } from './pages/shared/confirmation-modal.page';

const clearDataForTest = async () => {
	if (!process.env.CI) {
		const helpers = new TestHelpers();
		await helpers.deleteMenusForUser(testUsers.registered.mail);
	}
};

test.beforeEach(async () => {
	await clearDataForTest();
});

test.afterEach(async () => {
	await clearDataForTest();
});

test('A user can rename a menu', async ({ page }) => {
	const landingPage = new LandingPage(page);
	const authErrorPage = new NotSignedInErrorPage(page);
	const signInPage = new SignInPage(page);
	const homePage = new HomePage(page);
	const menusPage = new MenusPage(page);
	const confirmationModal = new ConfirmationModalPage(page);

	await test.step('Sign in and go to the Menu page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await authErrorPage.followLink();
		await signInPage.fillForm(testUsers.registered.mail, testUsers.registered.password); // idea: pass testUsers object instead
		await signInPage.submitForm();
		await homePage.goToMenuPage();
		await expect(page).toHaveScreenshot('no-menu.png');
	});

	await test.step('Create a new menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot('one-menu.png');
	});

	await test.step('Rename the first menu', async () => {
		await menusPage.triggerRenameModeForNthMenu(1);
		await expect(page).toHaveScreenshot('renaming-first-menu.png');
		await menusPage.renameNthMenu(1, 'Renamed Menu');
		await menusPage.saveNthMenu(1);
		await expect(page).toHaveScreenshot('first-menu-saved.png');
	});

	await test.step('Create another menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot('two-menus.png');
	});

	await test.step('Remove the second menu', async () => {
		await menusPage.deleteMenu(2);
		await expect(page).toHaveScreenshot('confirm-deletion.png');
		await confirmationModal.confirm();
		await expect(page).toHaveScreenshot('one-menu-renamed.png');
	});
});
