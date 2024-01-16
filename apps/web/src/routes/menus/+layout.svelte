<script lang="ts">
	import Header from '../../components/Header.svelte';

	const linkOverride = {
		url: '/test',
		label: 'coucou'
	}
</script>

<Header linkOverride={linkOverride} />

<slot />
