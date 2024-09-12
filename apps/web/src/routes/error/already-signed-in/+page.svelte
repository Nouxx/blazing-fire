<script>
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Whoops!</h1>
	<h2 class="text-sm my-3">You are already signed in.</h2>
	<h2 class="text-sm my-3">Simply sign out if you want to use another account.</h2>
	<Button
		variant="primary"
		tag="a"
		label="Go to account"
		href={routes.account}
		dataTestId="link-to-account"
	/>
</div>
