<script lang="ts">
	import { auth, googleAuthProvider } from '$lib/firebase.client';
	import { signInWithRedirect } from 'firebase/auth';

	function signInWithGoogle() {
		signInWithRedirect(auth, googleAuthProvider);
	}

	// todo: add hook to redirect to menus if signed in
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Sign In</h1>

	<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" on:click={signInWithGoogle}>
		Sign In with Google
	</button>

	<a class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" href="/">Go Back</a>
</div>
