<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { routes } from '$lib/const/routes.js';
	export let data;
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Almost there!</h1>
	<p class="text-sm my-3">
		Check your inbox
		<span class="font-bold">({data.email})</span>
		to verify your email address.
	</p>
	<Button
		variant="primary"
		tag="a"
		label="Sign in"
		href={routes.signin}
		dataTestId="link-to-signin"
	/>
</div>
