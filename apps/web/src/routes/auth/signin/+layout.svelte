<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	export let data;
	let { session } = data;
</script>

<Header {session} />

<slot />
