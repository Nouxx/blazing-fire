<script lang="ts">
	import { enhance } from '$app/forms';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import type { GenericInputElement } from '$lib/types/input-event.js';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';

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

<div class="flex flex-col items-center" data-testid="sign-in-form">
	<h1 class="text-3xl font-bold my-3">Sign In</h1>

	<form method="post" action="?/signInWithPassword" class="flex flex-col w-1/3" use:enhance>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			name="email"
			placeholder="email"
			value={form?.email ?? ''}
			on:input={(event) => handleInput(event, 'email')}
			data-testid="email"
		/>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			type="password"
			placeholder="password"
			name="password"
			on:input={(event) => handleInput(event, 'password')}
			data-testid="password"
		/>
		{#if form?.error}
			<p class="text-sm my-1 text-red-600" data-testid="error">Invalid credentials</p>
		{/if}
		<button
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded disabled:text-slate-200"
			disabled={!validityState.email || !validityState.password}
			data-testid="submit">Sign in</button
		>
	</form>

	<CallToAction title="Don't have an account?" label="Go to Sign Up" link="/auth/signup" />
</div>
