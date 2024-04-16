<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/types/routes.js';
	export let data;
	let { user } = data;
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">My Account</h1>

	<p class="text-sm my-3">{user?.email}</p>

	<form method="post" action="?/signOut">
		<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" data-testid="logout"
			>Logout</button
		>
	</form>

	<LinkButton label="Go back to app" link={routes.home} />
</div>
