<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/types/routes';
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Whoops!</h1>
	<h2 class="text-sm my-3">You are already signed in.</h2>
	<h2 class="text-sm my-3">Simply sign out if you want to use another account.</h2>
	<LinkButton label="Go to account" link={routes.account}></LinkButton>
</div>
