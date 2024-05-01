<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { routes } from '$lib/types/routes.js';
	export let data;
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Almost there!</h1>
	<p class="text-sm my-3">
		Check your inbox
		<span class="font-bold">({data.email})</span>
		to verify your email address.
	</p>
	<LinkButton label="Sign in" link={routes.signin} id="signin"/>
</div>
