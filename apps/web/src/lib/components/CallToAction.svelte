<script lang="ts">
	import LinkButton from './LinkButton.svelte';
	import LinkHeading from './LinkHeading.svelte';
	export let title: string;
	export let label: string;
	export let link: string;
	export let id: string;
</script>

<div class="flex flex-col w-1/3 items-center">
	<LinkHeading {title} />
	<LinkButton {link} {label} {id} />
</div>
