<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="page">
	<h1 class="text-3xl font-bold my-3">Home</h1>
	<div class="flex flex-col items-center my-4">
		<p class="text-sm my-1">There is nothing to do here, yet.</p>
	</div>
	<div class="page__actions">
		<Button tag="a" variant="primary" href={routes.menus} label="Go to menus" id="menus" />
		<Button tag="a" variant="primary" href={routes.account} label="Go to account" id="account" />
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;

		margin-left: 1.25rem;
		margin-right: 1.25rem;

		&__actions {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}
	}
</style>
