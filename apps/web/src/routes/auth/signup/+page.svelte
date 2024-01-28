<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Sign Up</h1>

	<form method="post" class="flex flex-col w-1/3" use:enhance>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			name="email"
			placeholder="email"
			value={form?.email ?? ''}
		/>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			type="password"
			placeholder="password"
			name="password"
		/>
		<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded">Sign up</button>
	</form>

	{#if form?.error}
		<p class="text-sm my-1 text-red-600">{form.error.userFriendlyMessage}</p>
	{/if}

	<h2 class="text-sm my-3">Have an account already?</h2>

	<a
		href="/auth/signin"
		class="p-1 my-3 w-1/6 border-2 text-center border-slate-200 shadow-md rounded">Go to Sign in</a
	>
</div>
