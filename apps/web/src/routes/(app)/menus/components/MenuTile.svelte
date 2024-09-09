<script lang="ts">
	import MenuName from './MenuName.svelte';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';
	import MenuRenameAction from './MenuRenameAction.svelte';

	import type { Menu } from '$lib/types/menu';

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

<div
	class="flex flex-row w-full p-3 my-3 h-16 border-2 border-slate-400 rounded hover:bg-slate-100"
	data-testid="menu"
>
	<div class="flex flex-1 w-full">
		<MenuName bind:menu {editionMode} />
	</div>

	{#if editionMode}
		<MenuActionsFeedback status={saveSuccessful} display={isSubmitted} />
		<div data-testid="actions" class="flex flex-row items-center [&>*]:ml-2">
			<MenuRenameAction
				{menu}
				disabled={!isNameDifferentFromDB}
				on:success={handleRenameSuccess}
				on:error={handleRenameError}
				on:save={handleSave}
			/>
			<MenuDeleteAction {menu} disabled={isLoading} />
		</div>
	{/if}
</div>
