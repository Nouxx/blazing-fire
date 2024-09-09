<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes.js';
	export let data;
	let { user } = data;
</script>

<div class="page">
	<h1 class="text-3xl font-bold my-3">My Account</h1>

	<p class="text-sm my-3">{user?.email}</p>

	<form method="post" action="?/signOut">
		<Button variant="primary" type="submit" label="Logout" dataTestId="logout" />
	</form>

	<Button
		variant="primary"
		tag="a"
		label="Go back to app"
		href={routes.home}
		dataTestId="link-to-home"
	/>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.25rem;
		gap: 1.25rem;
	}
</style>
