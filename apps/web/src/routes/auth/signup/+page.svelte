<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import { routes } from '$lib/const/routes';
	import Button from '$lib/components/Button.svelte';
	export let form: ActionData;
</script>

<div class="flex flex-col items-center" data-testid="sign-up-form">
	<h1 class="text-3xl font-bold my-3">Sign Up</h1>

	<form method="post" action="?/signUp" class="flex flex-col w-1/3 items-center" use:enhance>
		<input
			class="p-1 my-3 w-full border-2 border-slate-200 shadow-md rounded"
			name="email"
			placeholder="email"
			value={form?.email ?? ''}
			data-testid="email"
		/>
		<input
			class="p-1 my-3 w-full border-2 border-slate-200 shadow-md rounded"
			type="password"
			placeholder="password"
			name="password"
			data-testid="password"
		/>
		<Button variant="primary" type="submit" label="Sign up" dataTestId="submit" />
	</form>

	{#if form?.error}
		<p class="text-sm my-1 text-red-600">{form.error.message}</p>
	{/if}

	<CallToAction
		title="Have an account already?"
		label="Go to Sign In"
		link={routes.signin}
		id="signin"
	/>
</div>
