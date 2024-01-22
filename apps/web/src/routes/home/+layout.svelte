<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import AuthenticationRequired from '$lib/components/errors/AuthenticationRequired.svelte';

	export let data;

	let { session } = data;
	$: ({ session } = data);
</script>

<Header {session} />

{#if session}
	<slot />
{:else}
	<AuthenticationRequired />
{/if}
