<script>
	import Header from '$lib/components/Header.svelte';
	export let data;
	const { session } = data;
</script>

<Header {session} />

<slot />
