import { test, expect } from '@playwright/test';
import { HeaderPage } from './pages/shared/header.page';
import { HomepagePage } from './pages/home.page';
import { SignInPage } from './pages/auth/signin/signin.page';
import { SignUpFormPage } from './pages/auth/signup/signup-form.page';
import { SignUpSuccessPage } from './pages/auth/signup/signup-success.page';
import { AuthHelpers } from './pages/auth/auth-helpers';

test.afterEach(async () => {
	if (!process.env.CI) {
		const authHelpers = new AuthHelpers();
		await authHelpers.deleteUserByEmail('correct@mail.com');
	}
});

test('A user can sign up', async ({ page, context, request }) => {
	// Setup
	const headerPage = new HeaderPage(page);
	const homepagePage = new HomepagePage(page);
	const signInPage = new SignInPage(page);
	const signUpFormPage = new SignUpFormPage(page);

	// Go to sign up page
	await page.goto('/');
	await expect(page).toHaveScreenshot('landing.png');
	await headerPage.followLink();
	await expect(page).toHaveScreenshot('not-signed-in.png');
	await homepagePage.goToSignIn();
	await expect(page).toHaveScreenshot('sign-in.png');
	await signInPage.goToSignUp();

	// Edge case: weak password
	await signUpFormPage.fillForm('correct@mail.com', 'a');
	await signUpFormPage.submitForm();
	await expect(page).toHaveScreenshot('weak-password.png');

	// Edge case: invalid email
	await signUpFormPage.fillForm('incorrect-mail', 'aaaaaaa');
	await signUpFormPage.submitForm();
	await expect(page).toHaveScreenshot('invalid-email.png');

	// Happy path: sign up successful
	await signUpFormPage.fillForm('correct@mail.com', 'aProperPassword');
	await signUpFormPage.submitForm();
	await expect(page).toHaveScreenshot('sign-up-pending.png');
	const confirmationLink = await signUpFormPage.fetchConfirmationLink(request, 'correct@mail.com');

	const newTab = await context.newPage();
	const signUpSuccessPage = new SignUpSuccessPage(newTab);
	await newTab.goto(confirmationLink);
	await expect(newTab).toHaveScreenshot('sign-up-success.png');
	await signUpSuccessPage.goToHome();
	await expect(newTab).toHaveScreenshot('home.png');

	// Edge case: invalid link
	newTab.goto(confirmationLink);
	await expect(newTab).toHaveScreenshot('sign-up-error.png');
});
