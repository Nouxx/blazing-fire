<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="flex flex-col items-center" data-testid="sign-up-success">
	<h1 class="text-3xl font-bold my-3">All good!</h1>
	<p class="text-sm my-3">You have registered successfully, you can close this window.</p>
	<LinkButton label="Go to app" link={routes.home} id="home" />
</div>
