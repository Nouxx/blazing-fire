<script lang="ts">
	import { auth, googleAuthProvider } from '$lib/firebase.client';
	import { signInWithRedirect, signOut } from 'firebase/auth';
	import { userStore } from '../stores/user-store';

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

<div class="my-3">
	{#if $userStore.isLoading}
		<div class="w-28 flex space-x-4 animate-pulse items-center pl-1">
			<div class="flex-1 space-y-6">
				<div class="h-2 bg-slate-300 rounded" />
			</div>
		</div>
	{:else if $userStore.isLoggedIn}
		<button class="inline underline text-blue-500" on:click={logout}>Logout</button>
	{:else}
		<div>
			To use the app, you must
			<button class="inline underline text-blue-500" on:click={handleLogin}>login</button>
			first.
		</div>
	{/if}
</div>
