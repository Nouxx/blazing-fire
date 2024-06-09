<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/const/routes.js';
	export let data;
	let { user } = data;
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">My Account</h1>

	<p class="text-sm my-3">{user?.email}</p>

	<form method="post" action="?/signOut">
		<Button type="submit" label="Logout" id="logout" />
	</form>

	<LinkButton label="Go back to app" link={routes.home} id="home" />
</div>
