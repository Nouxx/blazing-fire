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

let landingPage: LandingPage;
let authErrorPage: NotSignedInErrorPage;
let signInPage: SignInPage;
let homePage: HomePage;
let menusPage: MenusPage;

test.beforeEach(async ({ page }) => {
	await clearDataForTest();

	landingPage = new LandingPage(page);
	authErrorPage = new NotSignedInErrorPage(page);
	signInPage = new SignInPage(page);
	homePage = new HomePage(page);
	menusPage = new MenusPage(page);

	await test.step('Sign in and go to the Menu page', async () => {
		await page.goto('/');
		await landingPage.goToApp();
		await authErrorPage.followLink();
		await signInPage.fillForm(testUsers.registered.mail, testUsers.registered.password);
		await signInPage.submitForm();
		await homePage.goToMenuPage();
	});

	await test.step('Hit the Create Menu button', async () => {
		await menusPage.createMenu();
	});
});

test.afterEach(async () => {
	await clearDataForTest();
});

test('Create menus', async ({ page }) => {
	await test.step('Hit the Create Menu button', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot('two-menus.png');
	});

	await test.step('Hit the Create Menu button again', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot('three-menus.png');
	});
});

test('Error when creating a new menu', async ({ page }) => {
	await test.step('Mock the createMenu form action', async () => {
		await page.route('*/**/createMenu', async (route) => {
			const json = { type: 'failure', status: 500, data: '[{"message":1},"Mock Error"]' };
			await route.fulfill({ json });
		});
	});

	await test.step('Hit the Create Menu button', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot('create-menu-error.png');
	});
});

test('Rename menus', async ({ page }) => {
	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot('one-menu-edition-on.png');
	});

	await test.step('Rename the first menu', async () => {
		await menusPage.renameNthMenu(1, 'My renamed menu');
		await expect(page).toHaveScreenshot('one-renaming-menu-edition-on.png');
	});

	await test.step('Save first menu', async () => {
		await menusPage.saveNthMenu(1);
		await expect(page).toHaveScreenshot('one-saved-ok-menu.png');
	});

	await test.step('Toggle edition mode (off)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot('one-renamed-menu-edition-off.png');
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot('one-renamed-menu-edition-on.png');
	});
});

test.skip('A user can rename a menu', async ({ page }) => {
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
		// await menusPage.triggerRenameModeForNthMenu(1);
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

	await test.step('Rename the remaining menu with keypress', async () => {
		// await menusPage.triggerRenameModeForNthMenu(1);
		await expect(page).toHaveScreenshot('renaming-first-menu-again.png'); // reference file name as const?
		await menusPage.renameNthMenu(1, 'Double Renamed Menu');
		// await menusPage.saveNthMenuWithKeypress(1);
		await expect(page).toHaveScreenshot('first-menu-saved-again.png');
	});
});
