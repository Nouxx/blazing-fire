<script lang="ts">
	import { auth } from '$lib/firebase.client';
	import { signOut } from 'firebase/auth';
	import { userStore } from '../../stores/user-store';
	import { goto } from '$app/navigation';

	function logout() {
		signOut(auth);
		userStore.update(() => {
			return { information: null, isLoggedIn: false, isLoading: false };
		});
		goto('/'); // todo: catch the promise
	}
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">My Account</h1>

	<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" on:click={logout}>
		Logout
	</button>

	<a href="/home" class="p-1 my-3 border-2 border-slate-200 shadow-md rounded"> Back to app </a>
</div>
