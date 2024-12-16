<script lang="ts">
	import MenuName from './MenuName.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';
	import BookmarkSolidIcon from '$lib/components/icons/BookmarkSolidIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';
	import Nutrient from './Nutrient.svelte';
	import type { Menu } from '$lib/types/menu';
	import { menuPageStore } from '../stores/menu-store';
	import { onDestroy } from 'svelte';

	export let menu: Menu;

	let isSubmitted: boolean;
	let saveSuccessful: boolean;
	let storedName: string;

	$: isNameDifferentFromDB = menu.name !== storedName;

	function initState() {
		isSubmitted = false;
		saveSuccessful = false;
		setStoredName(menu.name);
	}

	function setStoredName(name: string) {
		storedName = name;
		menu.name = name;
		isNameDifferentFromDB = false; // todo: remove
	}

	initState();

	let isEditionEnabled: boolean;

	const unsubscribe = menuPageStore.subscribe((store) => {
		isEditionEnabled = store.isEditionEnabled;
	});

	onDestroy(() => unsubscribe());

	$: if (isEditionEnabled) {
		initState();
	}

	$: if (!isEditionEnabled && isNameDifferentFromDB) {
		setStoredName(storedName);
	}
</script>

<div class="tile" data-testid="menu">
	<div class="tile__header flex">
		<div class="tile__header-title">
			<MenuName bind:menu />
		</div>
		<div class="tile__header-actions">
			{#if isEditionEnabled}
				<MenuDeleteAction {menu} />
			{:else}
				<MiniButton tag="button" variant="secondary" disabled={true} dataTestId="temp">
					<BookmarkSolidIcon />
				</MiniButton>
			{/if}
		</div>
	</div>

	<div class="tile__content">
		<Nutrient value="2600" label="Calories" />
		<Nutrient value="80" label="Fat" />
		<Nutrient value="120" label="Proteins" />
		<Nutrient value="370" label="Carbs" />
	</div>
</div>

<style lang="scss">
	.tile {
		display: flex;
		flex-direction: column;
		gap: 4rem;
		background-color: var(--color-background-tertiary);
		border-radius: 0.5rem;
		padding: 1rem;

		filter: drop-shadow(var(--shadow-color) 0.25rem 0.25rem 10px);

		&__header {
			display: flex;
			flex-direction: row;

			&-title {
				flex-grow: 1;
			}

			&-actions {
				// width: 2rem;
			}
		}

		&__content {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
