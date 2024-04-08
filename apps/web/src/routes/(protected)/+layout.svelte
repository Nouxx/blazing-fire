<script>
	import Header from '$lib/components/Header.svelte';
	import AuthenticationRequired from '$lib/components/errors/AuthenticationRequired.svelte';
	export let data;
</script>

<Header session={data.session} />

{#if !data.session}
	<AuthenticationRequired />
{:else}
	<slot />
{/if}
