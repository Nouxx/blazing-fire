<script lang="ts">
	import MenuName from './MenuName.svelte';

	import MenuActionsFeedback from './MenuActionsFeedback.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';
	import MenuRenameAction from './MenuRenameAction.svelte';

	import type { Menu } from '$lib/types/menu';

	export let menu: Menu;
	export let editionMode: boolean;
	// todo: disable toggle edit when saving

	let isSubmitted: boolean;
	let saveSuccessful: boolean;
	let isLoading: boolean;
	let nameInDB: string;
	$: isNameDifferentFromDB = menu.name !== nameInDB;

	function initState() {
		isSubmitted = false;
		saveSuccessful = false;
		isLoading = false;
		setRefName(menu.name);
	}

	function setRefName(name: string) {
		nameInDB = name;
		menu.name = name;
		isNameDifferentFromDB = false;
	}

	initState();

	$: if (editionMode === true) {
		initState();
	}

	$: if (editionMode === false) {
		if (isNameDifferentFromDB) {
			setRefName(nameInDB);
		}
	}

	function handleRenameSuccess(event: CustomEvent<Menu>) {
		isSubmitted = true;
		saveSuccessful = true;
		const newName = event.detail.name;
		setRefName(newName);
	}

	function handleRenameError() {
		isSubmitted = true;
		saveSuccessful = false;
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
		<div data-testid="actions" class="flex flex-row [&>*]:ml-2">
			<MenuRenameAction
				{menu}
				disabled={!isNameDifferentFromDB}
				on:success={handleRenameSuccess}
				on:error={handleRenameError}
			/>
			<MenuDeleteAction {menu} disabled={isLoading} />
		</div>
	{/if}
</div>
