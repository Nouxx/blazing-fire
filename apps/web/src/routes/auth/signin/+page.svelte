<script lang="ts">
	import { enhance } from '$app/forms';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import type { GenericInputElement } from '$lib/types/input-event.js';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import { routes } from '$lib/const/routes';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/atoms/Icon.svelte';
	import LeftArrow from '$lib/components/icons/LeftArrow.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import GoogleIcon from '$lib/components/icons/brand/GoogleIcon.svelte';
	import FacebookIcon from '$lib/components/icons/brand/FacebookIcon.svelte';
	import AppleIcon from '$lib/components/icons/brand/AppleIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';

	export let form: ActionData;

	type FormInput = {
		isValid: (value: string) => boolean;
	};

	let validityState = {
		email: true,
		password: true
	};

	type SignInFormInputName = 'email' | 'password';

	const signInFormFields: Record<SignInFormInputName, FormInput> = {
		email: {
			isValid: (value) => {
				return value !== '';
			}
		},
		password: {
			isValid: (value) => {
				return value !== '';
			}
		}
	};

	onMount(() => {
		validityState.email = form?.email ? true : false;
		validityState.password = false;
	});

	function handleInput(event: GenericInputElement, input: SignInFormInputName): void {
		const inputValue = event.currentTarget.value ?? '';
		const isValid = signInFormFields[input].isValid(inputValue);
		validityState[input] = isValid;
	}
</script>

<div data-testid="sign-in-form" class="login-page">
	<div class="login-hero">
		<img class="login-hero__image" src="/img/login-orange.png" alt="Login illustration" />
		<!-- todo: optimize image (srcset) -->
	</div>

	<div class="login-content">
		<header class="login-header">
			<LinkButton label="Go back" link="#">
				<Icon variant="secondary" slot="icon">
					<LeftArrow />
				</Icon>
			</LinkButton>
		</header>

		<div class="login-form">
			<div class="login-form__heading">
				<h1 class="login-form__heading-title">Log In</h1>
				<p class="login-form__heading-subtitle">
					Enter the information you provided when you created your account.
				</p>
			</div>

			<div class="login-form__social">
				<div class="login-form__social-icons">
					<MiniButton variant="primary" disabled>
						<GoogleIcon />
					</MiniButton>
					<MiniButton variant="primary" disabled>
						<FacebookIcon />
					</MiniButton>
					<MiniButton variant="primary" disabled>
						<AppleIcon />
					</MiniButton>
				</div>

				<p class="login-form__social-message">Social login is not yet available</p>
			</div>

			<div class="login-form__separator">
				<p class="login-form__separator-label">Or login with</p>
			</div>

			<form method="post" action="?/signInWithPassword" use:enhance>
				<input
					name="email"
					placeholder="email"
					value={form?.email ?? ''}
					on:input={(event) => handleInput(event, 'email')}
					data-testid="email"
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					on:input={(event) => handleInput(event, 'password')}
					data-testid="password"
				/>
				{#if form?.error}
					<p data-testid="error">Invalid credentials</p>
				{/if}
				<Button
					variant="primary"
					type="submit"
					label="Sign in"
					dataTestId="submit"
					disabled={!validityState.email || !validityState.password}
				/>
			</form>

			<CallToAction
				title="Don't have an account?"
				label="Go to Sign Up"
				link={routes.signup}
				id="signup"
			/>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../style' as *;

	.login-page {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.login-hero {
		width: 50%;

		&__image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.login-content {
		width: 50%;
		display: flex;
		flex-direction: column;

		.login-header {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			padding: $spacing-24 $spacing-16;

			&__cta {
				@include font-small;
			}
		}

		.login-form {
			height: 100%;
			padding: $spacing-48 $spacing-96;

			display: flex;
			flex-direction: column;
			gap: $spacing-24;

			&__heading {
				&-title {
					@include font-heading;
					text-align: center;
				}

				&-subtitle {
					@include font-body(var(--color-font-secondary));
					text-align: center;
				}
			}

			&__social {
				display: flex;
				flex-direction: column;
				gap: $spacing-8;

				&-icons {
					display: flex;
					flex-direction: row;
					justify-content: center;
					gap: $spacing-8;
				}

				&-message {
					@include font-small(var(--color-font-secondary));
					text-align: center;
				}
			}

			&__separator {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				gap: $spacing-80;

				&-label {
					@include font-body();
					text-align: center;
					width: fit-content;
				}

				&::before, &::after {
					content: '';
					height: 1px;
					border: 1px solid var(--color-font-primary);
					flex: 1;
				}
			}
		}
	}
</style>
