import { test, expect } from '@playwright/test';
import { SignInPage } from './pages/auth/signin/signin-form.page';
import { SignUpFormPage } from './pages/auth/signup/signup-form.page';
import { SignUpSuccessPage } from './pages/auth/signup/signup-success.page';
import { AuthHelpers } from './pages/auth/auth-helpers';
import { LandingPage } from './pages/landing.page';
import { AnyAuthErrorPage } from './pages/error/auth-error.page';

test.afterEach(async () => {
	if (!process.env.CI) {
		const authHelpers = new AuthHelpers();
		await authHelpers.deleteUserByEmail('correct@mail.com');
	}
});

test('A user can sign up', async ({ page, context, request }) => {
	// Setup
	const landingPage = new LandingPage(page);
	const signInPage = new SignInPage(page);
	const signUpFormPage = new SignUpFormPage(page);
	const authErrorPage = new AnyAuthErrorPage(page);
	const secondTab = await context.newPage();
	const signUpSuccessPage = new SignUpSuccessPage(page);

	// Go to sign up page
	await test.step('Go to Sign Up page', async () => {
		await page.goto('/');
		await expect(page).toHaveScreenshot('landing.png');
		await landingPage.goToApp();
		await expect(page).toHaveScreenshot('not-signed-in.png');
		await authErrorPage.followLink();
		await expect(page).toHaveScreenshot('sign-in.png');
		await signInPage.goToSignUp();
	});

	await test.step('Fill the form with a weak password', async () => {
		await signUpFormPage.fillForm('correct@mail.com', 'a');
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot('weak-password.png');
	});

	await test.step('Fill the form with a invalid email', async () => {
		await signUpFormPage.fillForm('incorrect-mail', 'aaaaaaa');
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot('invalid-email.png');
	});

	await test.step('Fill the form with correct credentials', async () => {
		await signUpFormPage.fillForm('correct@mail.com', 'aProperPassword');
		await signUpFormPage.submitForm();
		await expect(page).toHaveScreenshot('sign-up-pending.png');
	});

	await test.step('Follow the confirmation link', async () => {
		const confirmationLink = await signUpFormPage.fetchConfirmationLink(
			request,
			'correct@mail.com'
		);
		await page.goto(confirmationLink);
		await expect(page).toHaveScreenshot('sign-up-success.png');
		secondTab.goto(confirmationLink);
		await expect(secondTab).toHaveScreenshot('sign-up-error.png');
	});

	await test.step('Go to homepage', async () => {
		await signUpSuccessPage.goToHome();
		await expect(secondTab).toHaveScreenshot('home.png');
	});
});
