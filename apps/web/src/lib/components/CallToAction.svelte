<script lang="ts">
	import Button from './Button.svelte';
	export let title: string;
	export let label: string;
	export let link: string;
	export let id: string;
	const dataTestId = `link-to-${id}`;
</script>

<div class="flex flex-col w-1/3 items-center">
	<h2 class="text-sm my-3" data-testid="title">{title}</h2>
	<Button variant="primary" tag="a" href={link} {label} {dataTestId} />
</div>
