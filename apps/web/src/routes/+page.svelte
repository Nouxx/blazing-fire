<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import Greeter from '../components/Greeter.svelte';
	import { auth, googleAuthProvider } from '$lib/firebase.client';
	import { signInWithRedirect, signOut } from 'firebase/auth';
	import { userStore } from '../stores/user-store';

	// to do: https://firebase.google.com/docs/auth/web/redirect-best-practices#handle-signin-independently

	function handleLogin() {
		console.log('handleLogin()');
		signInWithRedirect(auth, googleAuthProvider);
	}

	function logout() {
		signOut(auth);
		userStore.update(() => {
			return { information: null, isLoggedIn: false, isLoading: false };
		});
	}
</script>

<div class="font-opensans flex flex-col w-full items-center">
	<div class="my-4 w-24">
		<img alt="The project logo" src="/logo.png" />
	</div>

	<h1 class="text-3xl font-bold my-3">Blazing Fire</h1>

	{#if $userStore.isLoading}
		<div class="w-28 flex space-x-4 animate-pulse">
			<div class="flex-1 space-y-6 py-1">
				<div class="h-2 bg-slate-300 rounded" />
				<div class="h-2 bg-slate-300 rounded" />
			</div>
		</div>
	{:else}
		<Greeter />

		<div>
			{#if $userStore.isLoggedIn}
				<button class="inline underline text-blue-500" on:click={logout}>Logout</button>
			{:else}
				<div>
					To use the app, you must
					<button class="inline underline text-blue-500" on:click={handleLogin}>login</button>
					first.
				</div>
			{/if}
		</div>
	{/if}

	<div class="my-5 text-gray-400 text-sm">
		<p>(environment: {PUBLIC_ENVIRONMENT})</p>
	</div>
</div>
