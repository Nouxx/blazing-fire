<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import Icon from '$lib/components/atoms/Icon.svelte';
	import LeftArrow from '$lib/components/icons/LeftArrow.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import GoogleIcon from '$lib/components/icons/brand/GoogleIcon.svelte';
	import FacebookIcon from '$lib/components/icons/brand/FacebookIcon.svelte';
	import AppleIcon from '$lib/components/icons/brand/AppleIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
	import FormCheckbox from '$lib/components/FormCheckbox.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { routes } from '$lib/const/routes';
	import Message from '$lib/components/Message.svelte';

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
		validityState.email = form?.data?.email ? true : false;
		validityState.password = false;
	});

	function handleInput(newValue: string, input: SignInFormInputName): void {
		const isValid = signInFormFields[input].isValid(newValue);
		validityState[input] = isValid;
	}

	$: if (form) {
		if (form.error) {
			showErrorMessage = true;
		}
	}

	let showErrorMessage = true;

	function handleMessageDismiss() {
		showErrorMessage = false;
	}
</script>

<div data-testid="sign-in-form" class="login-page">
	<div class="login-hero">
		<img class="login-hero__image" src="/img/login-orange.png" alt="Login illustration" />
		<!-- todo: optimize image (srcset) -->
	</div>

	<div class="login-content">
		<header class="login-header">
			<LinkButton label="Go back" link={routes.landing}>
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
					<MiniButton variant="primary">
						<GoogleIcon />
					</MiniButton>
					<MiniButton variant="primary">
						<FacebookIcon />
					</MiniButton>
					<MiniButton variant="primary">
						<AppleIcon />
					</MiniButton>
				</div>

				<!-- <p class="login-form__social-message">Social login is not yet available</p> -->
			</div>

			<div class="login-form__separator">
				<p class="login-form__separator-label">Or login with</p>
			</div>

			<form class="login-form__inputs" method="post" action="?/signInWithPassword" use:enhance>
				<FormInput
					type="email"
					name="email"
					label="Email"
					placeholder="your@email.com"
					value={form?.data?.email ?? ''}
					on:input={(event) => handleInput(event.detail.value, 'email')}
				/>
				<FormInput
					type="password"
					name="password"
					label="Password"
					placeholder="your password"
					value={form?.error ? '' : ''}
					on:input={(event) => handleInput(event.detail.value, 'password')}
				/>

				{#if form?.error && showErrorMessage}
					<Message on:dismiss={handleMessageDismiss}>
						<Text color="tertiary">Invalid credentials</Text>
					</Message>
				{/if}

				<div class="login-form__submit">
					<div class="login-form__helper-links">
						<FormCheckbox name="remember-me">
							<Text font="small" color="secondary">Remember me?</Text>
						</FormCheckbox>
						<Link href="#" color="secondary" font="small">Forgot password?</Link>
					</div>
					<div class="login-form__button-wrapper">
						<Button
							variant="primary"
							type="submit"
							label="Sign in"
							dataTestId="submit"
							disabled={!validityState.email || !validityState.password}
							fullWidth
							fullHeight
						/>
					</div>
				</div>
			</form>

			<div class="cta">
				<Text font="body-bold" color="secondary">
					Don't have an account yet?
					<Link href={routes.signup} color="secondary" font="body-bold">Register</Link>
				</Text>
			</div>
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
				display: flex;
				flex-direction: column;
				gap: $spacing-8;

				&-title {
					@include font-heading;
					text-align: center;
				}

				&-subtitle {
					@include font-small(var(--color-font-secondary));
					text-align: left;
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

				&::before,
				&::after {
					content: '';
					height: 1px;
					border: 1px solid var(--color-font-primary);
					flex: 1;
				}
			}

			&__inputs {
				display: flex;
				flex-direction: column;
				gap: $spacing-16;
			}

			&__submit {
				display: flex;
				flex-direction: column;
				gap: $spacing-8;
			}

			&__helper-links {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				@include font-small(var(--color-font-secondary));
			}

			&__button-wrapper {
				height: 4rem;
			}
		}

		.cta {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: $spacing-16;
		}
	}
</style>
