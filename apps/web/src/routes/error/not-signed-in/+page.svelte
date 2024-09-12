<script>
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="page">
	<h1 class="text-3xl font-bold my-3">Whoops!</h1>
	<h2 class="text-sm my-3">You need to be signed in to access this page.</h2>
	<Button
		variant="primary"
		tag="a"
		label="Go to Sign In"
		href={routes.signin}
		dataTestId="link-to-signin"
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
