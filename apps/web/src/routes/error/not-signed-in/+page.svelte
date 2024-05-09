<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Whoops!</h1>
	<h2 class="text-sm my-3">You need to be signed in to access this page.</h2>
	<LinkButton label="Go to Sign In" link={routes.signin} id="signin" />
</div>
