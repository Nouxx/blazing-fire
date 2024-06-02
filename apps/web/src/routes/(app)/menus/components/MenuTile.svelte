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

	let nameInDB = menu.name; // todo: rename
	let isNameDifferentFromDB: boolean;

	function initState(caller: any) {
		console.log('initState called by ' + caller);
		isSubmitted = false;
		saveSuccessful = false;
		isLoading = false;
		menu.name = nameInDB;
		isNameDifferentFromDB = false;
	}

	initState('script');

	function onChange(edition: boolean) {
		initState('change on edition');
	}

	$: isNameDifferentFromDB = menu.name !== nameInDB;

	$: onChange(editionMode);

	function handleRenameSuccess(event: CustomEvent<Menu>) {
		isSubmitted = true;
		saveSuccessful = true;
		const newMenuName = event.detail.name;
		nameInDB = newMenuName;
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
				on:saveSuccess={handleRenameSuccess}
				on:saveError={handleRenameError}
			/>
			<MenuDeleteAction {menu} disabled={isLoading} />
		</div>
	{/if}
</div>
