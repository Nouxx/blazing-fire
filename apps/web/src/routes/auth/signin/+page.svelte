<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;

	// disable button if form is not correct

	function handleInput(event) {
		console.log(event.target.value);
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Sign In</h1>

	<!-- <div class="debug-container">
		email = {form?.email}
	</div> -->

	<form method="post" action="?/signInWithPassword" class="flex flex-col w-1/3" use:enhance>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			name="email"
			placeholder="email"
			value={form?.email ?? ''}
			on:input={handleInput}
		/>
		<input
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			type="password"
			placeholder="password"
			name="password"
		/>
		{#if form?.error}
			<p class="text-sm my-1 text-red-600">Invalid credentials</p>
		{/if}
		<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded">Sign in</button>
	</form>

	<button class="p-1 my-3 w-1/3 border-2 border-slate-200 shadow-md rounded">
		Sign In with Google
	</button>

	<h2 class="text-sm my-3">Don't have an account?</h2>

	<a
		href="/auth/signup"
		class="p-1 my-3 w-1/6 border-2 text-center border-slate-200 shadow-md rounded">Go to Sign Up</a
	>
</div>
