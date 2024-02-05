<script lang="ts">
	import { enhance } from '$app/forms';
	import type { GenericInputElement } from '$lib/types/input-event.js';
	import { onMount } from 'svelte';

	export let form;

	let validityState = {
		email: true,
		password: true
	};

	type FormField = 'email' | 'password';

	type SignInFormField = {
		isValid: (value: string) => boolean;
	};

	const fields: Record<FormField, SignInFormField> = {
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

	function handleInput(event: GenericInputElement, field: FormField): void {
		const inputValue = event.currentTarget.value ?? '';
		const isValid = fields[field].isValid(inputValue);
		validityState[field] = isValid;
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Sign In</h1>

	<form method="post" action="?/signInWithPassword" class="flex flex-col w-1/3" use:enhance>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			name="email"
			placeholder="email"
			value={form?.email ?? ''}
			on:input={(event) => handleInput(event, 'email')}
		/>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			type="password"
			placeholder="password"
			name="password"
			on:input={(event) => handleInput(event, 'password')}
		/>
		{#if form?.error}
			<p class="text-sm my-1 text-red-600">Invalid credentials</p>
		{/if}
		<button
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded disabled:text-slate-200"
			disabled={!validityState.email || !validityState.password}>Sign in</button
		>
	</form>

	<!-- <button class="p-1 my-3 w-1/3 border-2 border-slate-200 shadow-md rounded">
		Sign In with Google
	</button> -->

	<h2 class="text-sm my-3">Don't have an account?</h2>

	<a
		href="/auth/signup"
		class="p-1 my-3 w-1/6 border-2 text-center border-slate-200 shadow-md rounded">Go to Sign Up</a
	>
</div>
