<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';
	import BaconIcon from '$lib/components/icons/BaconIcon.svelte';
	import EggIcon from '$lib/components/icons/EggIcon.svelte';
	import FlameIcon from '$lib/components/icons/FlameIcon.svelte';
	import WheatIcon from '$lib/components/icons/WheatIcon.svelte';

	type MacroNutrient = 'Calories' | 'Proteins' | 'Fat' | 'Carbs';

	export let label: MacroNutrient;
	export let value: string;

	const iconMap = {
		Calories: FlameIcon,
		Proteins: EggIcon,
		Fat: BaconIcon,
		Carbs: WheatIcon
	} as const;
</script>

<div class="content">
	<Icon variant="primary">
		<svelte:component this={iconMap[label]} />
	</Icon>

	<p>{value} {label}</p>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		height: 2rem;
		padding: 0.25rem;
	}
</style>
