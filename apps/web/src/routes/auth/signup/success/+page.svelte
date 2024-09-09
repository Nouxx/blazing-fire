<script>
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="flex flex-col items-center" data-testid="sign-up-success">
	<h1 class="text-3xl font-bold my-3">All good!</h1>
	<p class="text-sm my-3">You have registered successfully, you can close this window.</p>
	<Button variant="primary" tag="a" label="Go to app" href={routes.home} dataTestId="link-to-home" />
</div>
