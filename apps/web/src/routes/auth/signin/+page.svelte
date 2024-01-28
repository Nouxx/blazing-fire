<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	export let form;

	// set default value (is JS disabled)
	let isEmailValid = true;
	let isPasswordValid = true;

	onMount(() => {
		// update values (is JS enabled)
		isEmailValid = form?.email ? true : false;
		isPasswordValid = false;
	});

	function handleInput(event: any, field: string) {
		const inputValue: string = event.target.value;
		if (field === 'email') {
			isEmailValid = inputValue.trim() !== '';
		} else if (field === 'password') {
			isPasswordValid = inputValue.trim() !== '';
		}
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
			disabled={!isEmailValid || !isPasswordValid}>Sign in</button
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
