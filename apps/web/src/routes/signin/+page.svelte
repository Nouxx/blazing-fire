<script lang="ts">
	import { auth, googleAuthProvider } from '$lib/firebase.client';
	import { signInWithRedirect } from 'firebase/auth';
	import { userStore, type User } from '../../stores/user-store';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	function signInWithGoogle() {
		signInWithRedirect(auth, googleAuthProvider);
	}

	let pageIsLoading: boolean = true;
	let user: User;

	const unsub = userStore.subscribe(async (userValue) => {
		console.log('userValue', userValue);
		if (!userValue.isLoading) {
			user = userValue;
			pageIsLoading = false;
			if (userValue.isLoggedIn) {
				goto('/menus');
			}
		}
	});

	onDestroy(() => {
		unsub();
	});
</script>

<div class="flex flex-col items-center">
	{#if pageIsLoading}
		<div class="h-2 w-28 animate-pulse bg-slate-300 rounded my-9" />
	{:else if !user.isLoggedIn}
		<h1 class="text-3xl font-bold my-3">Sign In</h1>
		<button
			class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"
			on:click={signInWithGoogle}
		>
			Sign In with Google
		</button>
		<a class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" href="/menus">Go Back</a>
	{/if}
</div>
