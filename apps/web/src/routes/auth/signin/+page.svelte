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
			<h1 class="login-form__title">Log In</h1>
			<p class="login-form__subtitle">
				Enter the information you provided when you created your account.
			</p>

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
			padding: $spacing-80 $spacing-128;

			&__title {
				@include font-heading;
				text-align: center;
				margin-bottom: $spacing-16;
			}

			&__subtitle {
				@include font-body(var(--color-font-secondary));
				text-align: center;
				margin-bottom: $spacing-32;
			}
		}
	}
</style>
