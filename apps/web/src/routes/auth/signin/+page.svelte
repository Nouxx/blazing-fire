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

<div data-testid="sign-in-form" class="page">
	<div class="page__image">
		<img src="/img/login-orange.png" alt="Login illustration" />
	</div>

	<div class="page__content">
		<header class="header">
			<Icon variant="secondary">
				<LeftArrow />
			</Icon>
			<p class="header__cta">Go back</p>
		</header>

		<h1>Sign In</h1>

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

<style lang="scss">
	@use '../../../style' as *;

	.page {
		display: flex;
		flex-direction: row;
		height: 100%;

		&__image {
			width: 50%;

			& img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__content {
			width: 50%;
			display: flex;
			flex-direction: column;

			.header {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				padding: $spacing-24 $spacing-16;

				&__cta {
					@include font-small;
				}
			}
		}
	}
</style>
