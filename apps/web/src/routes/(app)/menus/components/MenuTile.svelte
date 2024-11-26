<script lang="ts">
	import MenuName from './MenuName.svelte';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';
	import MenuRenameAction from './MenuRenameAction.svelte';

	import type { Menu } from '$lib/types/menu';
	import BookmarkSolidIcon from '$lib/components/icons/BookmarkSolidIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import Nutrient from './Nutrient.svelte';

	export let menu: Menu;
	export let editionMode: boolean;

	let isSubmitted: boolean;
	let saveSuccessful: boolean;
	let isLoading: boolean;
	/** the value currently stored in the data source (DB) */
	let storedName: string;

	$: isNameDifferentFromDB = menu.name !== storedName;

	function initState() {
		isSubmitted = false;
		saveSuccessful = false;
		setStoredName(menu.name);
		isLoading = false;
	}

	function setStoredName(name: string) {
		storedName = name;
		menu.name = name;
		isNameDifferentFromDB = false;
	}

	initState();

	$: if (editionMode === true) {
		initState();
	}

	$: if (editionMode === false) {
		if (isNameDifferentFromDB) {
			setStoredName(storedName);
		}
	}

	function handleRenameSuccess(event: CustomEvent<Menu>) {
		isSubmitted = true;
		saveSuccessful = true;
		setStoredName(event.detail.name);
		isLoading = false;
	}

	function handleRenameError() {
		isSubmitted = true;
		saveSuccessful = false;
		isLoading = false;
	}

	function handleSave() {
		isLoading = true;
	}
</script>

<div class="tile" data-testid="menu">
	<div class="tile__header flex">
		<div class="tile__header-title">
			
			<MenuName bind:menu {editionMode} />
		</div>
		<div class="tile__header-actions">
			{#if editionMode}
				<MenuDeleteAction {menu} disabled={isLoading} />
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

	<!-- {#if editionMode}
		<MenuActionsFeedback status={saveSuccessful} display={isSubmitted} />
		<div data-testid="actions" class="flex flex-row items-center gap-2">
			<MenuRenameAction
				{menu}
				disabled={!isNameDifferentFromDB}
				on:success={handleRenameSuccess}
				on:error={handleRenameError}
				on:save={handleSave}
			/>
			
		</div>
	{/if} -->
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
