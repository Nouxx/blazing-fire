import LoginNavigation from '$lib/components/LoginNavigation.svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import type { LoginNavigationProperties } from '$lib/types/login-navigation';

const testProperties: LoginNavigationProperties = {
	title: 'component title',
	buttonLabel: 'button label',
	buttonLink: 'button link'
};

describe('LoginNavigation.svelte', () => {
	afterEach(() => cleanup());

	it('renders properly for sign in', () => {
		render(LoginNavigation, { properties: testProperties });
		const renderedTitle = screen.getByTestId('title');
		const renderedButton = screen.getByTestId('link');
		expect(renderedTitle.innerHTML).toStrictEqual(testProperties.title);
		expect(renderedButton.innerHTML).toStrictEqual(testProperties.buttonLabel);
		expect(renderedButton).toHaveAttribute('href', testProperties.buttonLink);
	});
});
