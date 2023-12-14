<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { auth, firestore } from '$lib/firebase.client';
	import { toUserInformation, userStore } from '../stores/user-store';
	import { getRedirectResult } from 'firebase/auth';
	import { createNewUser, userExists } from '$lib/user';

	onMount(() => {
		auth.onAuthStateChanged(async (user) => {
			console.log('onAuthStateChanged');
			if (user) {
				// todo: refactor
				userStore.update(() => {
					return { information: toUserInformation(user), isLoggedIn: true, isLoading: false };
				});
			} else {
				userStore.update(() => {
					return { information: null, isLoggedIn: false, isLoading: false };
				});
			}
			getRedirectResult(auth)
				.then(async (result) => {
					if (result) {
						const userInformation = toUserInformation(result.user);
						// todo: refactor
						userStore.update(() => {
							return { information: userInformation, isLoggedIn: true, isLoading: false };
						});
						const userIsNotRegistered = !(await userExists(firestore, userInformation.userId));
						if (userIsNotRegistered) {
							createNewUser(firestore, userInformation);
						}
					}
				})
				.catch((error) => {
					// todo: step #1 - log the error
					// todo: step #2 - display the error
					console.log('getRedirectResult() - error');
					console.log('error', error);
				});
		});
	});
</script>

<slot />
