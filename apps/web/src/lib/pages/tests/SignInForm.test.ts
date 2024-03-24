import { cleanup, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, it, describe, expect } from 'vitest';
import SignInForm from '../SignInForm.svelte';
import type { ActionData } from '../../../routes/auth/signin/$types';

// overall that's cool and quick but I'm not sure about testing edges cases properly
// especially when we mock the form => maintainability?

describe('SignInForm.svelte', () => {
	afterEach(() => cleanup());

	it("can't be submitted if inputs are both empty", () => {
		const mockedForm: ActionData = {} as ActionData;
		render(SignInForm, { form: mockedForm });
		const submitButton = screen.getByTestId('submit');
		expect(submitButton).toBeDisabled();
	});

	it('can be submitted if both inputs are valid', async () => {
		const user = userEvent.setup();
		const mockedForm: ActionData = {} as ActionData;
		render(SignInForm, { form: mockedForm });
		const emailInput = screen.getByTestId('email');
		const passwordInput = screen.getByTestId('password');
		const submitButton = screen.getByTestId('submit');
		await user.type(emailInput, 'mail@test.com');
		expect(submitButton).toBeDisabled();
		await user.type(passwordInput, 'myPassword');
		expect(submitButton).toBeEnabled();
	});

	it('return an error', async () => {
		const mockedForm: ActionData = { error: 'test error' } as ActionData;
		render(SignInForm, { form: mockedForm });
		const error = screen.getByTestId('error');
		expect(error).toBeVisible();
	});
});
