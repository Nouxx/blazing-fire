<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { auth, firestore } from '$lib/firebase.client';
	import { toUserInformation, userStore, type UserInformation } from '../stores/user-store';
	import { getRedirectResult, type User } from 'firebase/auth';
	import { createNewUser, userExists } from '$lib/user/user';

	onMount(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			console.log('onAuthStateChanged()');
			getRedirectResult(auth)
				.then(async (result) => {
					console.log('getRedirectResult() - then');
					if (result) {
						const user = toUserInformation(result.user);
						userStore.update(() => {
							return { information: user, isLoggedIn: true };
						});
						const userIsNotRegistered = !(await userExists(firestore, user.userId));
						if (userIsNotRegistered) {
							createNewUser(firestore, user);
						}
					}
				})
				.catch((error) => {
					// ca me trigger que le truc catch des errors tout le temps
					console.log('getRedirectResult() - error');
					console.log('error', error);
				});
		});
	});
</script>

<slot />
