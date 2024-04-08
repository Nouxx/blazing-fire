<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import AlreadySignedIn from '$lib/components/errors/AlreadySignedIn.svelte';
	export let data;
	let { session } = data;
	$: ({ session } = data);
</script>

<Header {session} />

{#if session}
	<AlreadySignedIn />
{:else}
	<slot />
{/if}
