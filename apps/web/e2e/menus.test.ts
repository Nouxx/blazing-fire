import { test, expect } from '@playwright/test';

import { LandingPage } from './pages/landing.page';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { NotSignedInErrorPage } from './pages/error/not-signed-in.page';
import { HomePage } from './pages/home.page';
import { MenusPage } from './pages/menus.page';
import { ConfirmationModalPage } from './pages/shared/confirmation-modal.page';

import { testUsers } from './data/users';

import { createSupabaseHelpers } from './utils/supabase-helpers';
import { SnapshotHandler } from './utils/snapshot-handler';

const clearDataForTest = async () => {
	const helpers = createSupabaseHelpers();
	await helpers.deleteMenusForUser(testUsers.registered.mail);
};

let landingPage: LandingPage;
let authErrorPage: NotSignedInErrorPage;
let signInPage: SignInPage;
let homePage: HomePage;
let menusPage: MenusPage;
let confirmationModalPage: ConfirmationModalPage;

test.beforeEach(async ({ page }) => {
	await clearDataForTest();

	landingPage = new LandingPage(page);
	authErrorPage = new NotSignedInErrorPage(page);
	signInPage = new SignInPage(page);
	homePage = new HomePage(page);
	menusPage = new MenusPage(page);
	confirmationModalPage = new ConfirmationModalPage(page);

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

test.only('Create menus', async ({ page }) => {
	const sh = new SnapshotHandler('create-menus');
	const SNAP_TWO_MENUS = 'Two menus displayed with edition mode off';
	const SNAP_THREE_MENUS = 'Three menus displayed with edition mode off';

	await test.step('Create a 2nd menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_TWO_MENUS));
	});

	await test.step('Create a 3rd menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_THREE_MENUS));
	});
});

test('Error when creating a new menu', async ({ page }) => {
	const TEST_ID = 'create-menus-error';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_CREATE_MENU_ERROR = 'One menu displayed with error after creating another one';

	await test.step('Mock the createMenu form action', async () => {
		await page.route('*/**/createMenu', async (route) => {
			const json = { type: 'failure', status: 500, data: '[{"message":1},"Mock Error"]' };
			await route.fulfill({ json });
		});
	});

	await test.step('Create a second menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_CREATE_MENU_ERROR));
	});
});

test('Rename menus', async ({ page }) => {
	const TEST_ID = 'rename-menus';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_ONE_MENU = 'One menu displayed with edition mode on';
	const SNAP_ONE_MENU_RENAMED = 'One menu renamed but not saved with edition mode on';
	const SNAP_ONE_MENU_SAVED = 'One menu renamed and saved successfully with edition mode on';
	const SNAP_ONE_MENU_SAVED_EDITION_OFF = 'One menu saved successfully with edition mode off';
	const SNAP_ONE_MENU_SAVED_EDITION_ON = 'One menu saved successfully with edition mode on';

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Rename the first menu', async () => {
		await menusPage.renameNthMenu(1, 'Renamed menu');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_RENAMED));
	});

	await test.step('Save first menu', async () => {
		await menusPage.saveNthMenu(1);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_SAVED));
	});

	await test.step('Toggle edition mode (off)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_SAVED_EDITION_OFF));
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_SAVED_EDITION_ON));
	});
});

test('Rename a menu without saving', async ({ page }) => {
	const TEST_ID = 'rename-menus-without-saving';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_ONE_MENU = 'One menu with edition mode on';
	const SNAP_ONE_MENU_RENAMING = 'One menu renamed but not saved with edition mode on';
	const SNAP_ONE_MENU_SAVED_EDITION_OFF = 'One menu renamed and save with edition mode off';
	const SNAP_ONE_MENU_SAVED = 'One menu renamed and save with edition mode on';

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Rename the first menu without saving it', async () => {
		await menusPage.renameNthMenu(1, 'My renamed menu that will not be saved');
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_RENAMING));
	});

	await test.step('Toggle edition mode (off)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_SAVED_EDITION_OFF));
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_SAVED));
	});
});

test('Error when renaming a new menu', async ({ page }) => {
	const TEST_ID = 'rename-menus-error';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_ONE_MENU = 'The menu with edition mode on';
	const SNAP_ONE_MENU_ERROR = 'The menu after the error on renaming';
	const SNAP_ONE_MENU_EDITION_OFF = 'The menu with edition mode off';

	await test.step('Mock the renameMenu form action', async () => {
		await page.route('*/**/renameMenu', async (route) => {
			const json = { type: 'failure', status: 500, data: '[{"message":1},"Mock Error"]' };
			await route.fulfill({ json });
		});
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Rename the first menu', async () => {
		await menusPage.renameNthMenu(1, 'Menu 1 renamed');
		await menusPage.saveNthMenu(1);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_ERROR));
	});

	await test.step('Toggle edition mode (off)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_EDITION_OFF));
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});
});

test('Delete menus', async ({ page }) => {
	const TEST_ID = 'delete-menus';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_TWO_MENUS = 'Two menus displayed with edition mode off';
	const SNAP_TWO_MENUS_EDITION_ON = 'Two menus displayed with edition mode on';
	const SNAP_MODAL_TWO_MENUS = 'Confirmation modal displayed when deleting the 2nd menu';
	const SNAP_ONE_MENU = 'One menu displayed with edition mode on';
	const SNAP_MODAL_LAST_MENUS = 'Confirmation modal displayed when deleting the last menu';
	const SNAP_NO_MENU = 'No menu page';

	await test.step('Create a 2nd menu', async () => {
		await menusPage.createMenu();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_TWO_MENUS));
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_TWO_MENUS_EDITION_ON));
	});

	await test.step('Delete the 2nd menu', async () => {
		await menusPage.deleteNthMenu(2);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_MODAL_TWO_MENUS));
		await confirmationModalPage.confirm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Cancel the deletion of the last menu', async () => {
		await menusPage.deleteNthMenu(1);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_MODAL_LAST_MENUS));
		await confirmationModalPage.cancel();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Delete the last menu', async () => {
		await menusPage.deleteNthMenu(1);
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_MODAL_LAST_MENUS));
		await confirmationModalPage.confirm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_NO_MENU));
	});
});

test('Error when deleting a new menu', async ({ page }) => {
	const TEST_ID = 'delete-menus-error';
	const sh = new SnapshotHandler(TEST_ID);
	const SNAP_ONE_MENU = 'The menu with edition mode on';
	const SNAP_ONE_MENU_ERROR = 'The menu after the error on deletion';
	const SNAP_ONE_MENU_EDITION_OFF = 'The menu with edition mode off';

	await test.step('Mock the deleteMenu form action', async () => {
		await page.route('*/**/deleteMenu', async (route) => {
			const json = { type: 'failure', status: 500, data: '[{"message":1},"Mock Error"]' };
			await route.fulfill({ json });
		});
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});

	await test.step('Delete the first menu', async () => {
		await menusPage.deleteNthMenu(1);
		await confirmationModalPage.confirm();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_ERROR));
		await confirmationModalPage.cancel();
	});

	await test.step('Toggle edition mode (off)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU_EDITION_OFF));
	});

	await test.step('Toggle edition mode (on)', async () => {
		await menusPage.toggleEditionMode();
		await expect(page).toHaveScreenshot(sh.getFileName(SNAP_ONE_MENU));
	});
});
