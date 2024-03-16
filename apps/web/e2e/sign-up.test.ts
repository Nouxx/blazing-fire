import { test, expect } from '@playwright/test';
import { HeaderPage } from './pages/shared/header.page';
import { HomepagePage } from './pages/home.page';
import { SignInPage } from './pages/signin.page';
import { AccountPage } from './pages/account.page';
import { SignUpPage } from './pages/signup.page';

test('A user can sign up', async ({ page }) => {
	// Setup
	const headerPage = new HeaderPage(page);
	const homepagePage = new HomepagePage(page);
	const signInPage = new SignInPage(page);
	const signUpPage = new SignUpPage(page);

	// Go to sign up page
	await page.goto('/');
	await expect(page).toHaveScreenshot('landing.png');
	await headerPage.followLink();
	await expect(page).toHaveScreenshot('not-signed-in.png');
	await homepagePage.goToSignIn();
	await expect(page).toHaveScreenshot('sign-in.png');
	await signInPage.goToSignUp();

	// Edge case: weak password
	await signUpPage.fillForm('correct@mail.com', 'a');
	await signUpPage.submitForm();
	await expect(page).toHaveScreenshot('weak-password.png');

	// Edge case: invalid email
	await signUpPage.fillForm('incorrect-mail', 'aaaaaaa');
	await signUpPage.submitForm();
	await expect(page).toHaveScreenshot('invalid-email.png');

	// Happy path: sign up successful
	await signUpPage.fillForm('correct@mail.com', 'aProperPassword');
	await signUpPage.submitForm();
	await expect(page).toHaveScreenshot('sign-up-pending.png');

	// todo: open a new tab to inbucket, validate the confirmation email
    // and follow the link to the signed in tab.
});
