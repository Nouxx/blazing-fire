<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';
	import BaconIcon from '$lib/components/icons/BaconIcon.svelte';
	import EggIcon from '$lib/components/icons/EggIcon.svelte';
	import FlameIcon from '$lib/components/icons/FlameIcon.svelte';
	import WheatIcon from '$lib/components/icons/WheatIcon.svelte';

	type MacroNutrient = 'Calories' | 'Proteins' | 'Fat' | 'Carbs';

	export let label: MacroNutrient;
	export let value: string;
</script>

<div class="content">
	{#if label === 'Calories'}
		<Icon variant="primary">
			<FlameIcon />
		</Icon>
	{:else if label === 'Proteins'}
		<EggIcon />
	{:else if label === 'Fat'}
		<BaconIcon />
	{:else if label === 'Carbs'}
		<WheatIcon />
	{/if}
	<p>{value} {label}</p>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		height: 2rem;
		padding: 0.25rem;
	}
</style>
