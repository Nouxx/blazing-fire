<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/types/routes';
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">Home</h1>
	<div class="flex flex-col items-center mt-2">
		<p class="text-sm my-1">There is nothing to do here, yet.</p>
	</div>
	<LinkButton label="Go to menus" link={routes.menus} id="menus" />
	<LinkButton label="Go to account" link={routes.account} id="account" />
</div>
