<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { Menu } from '$lib/types/menu';
	import { apiRoutes } from '$lib/types/routes';
	import ConfirmationModal from './ConfirmationModal.svelte';

	export let menu: Menu;

	let isRenameModeEnabled = false;
	let initialMenuName: string;
	let isModalDisplayed = false;

	function showModal() {
		isModalDisplayed = true;
	}

	function hideModal() {
		isModalDisplayed = false;
	}

	function enableRenameMode() {
		initialMenuName = menu.name;
		isRenameModeEnabled = true;
	}

	// todo: move to form actions? so that we don't have to invalidate the load function
	async function saveMenu() {
		if (menu.name === initialMenuName) {
			isRenameModeEnabled = false;
			return;
		}
		const body = {
			name: menu.name
		};
		const res = await fetch(`${apiRoutes.menus}/${menu.id}`, {
			method: 'PUT',
			body: JSON.stringify(body)
		});
		const updatedName = (await res.json()).name;
		menu.name = updatedName;
		isRenameModeEnabled = false;
	}

	async function removeMenu() {
		const res = await fetch(`${apiRoutes.menus}/${menu.id}`, {
			method: 'DELETE'
		});
		console.log(`response from "${apiRoutes.menus}/${menu.id}"`, res);
		invalidate('menus:load');
	}

	function getDeleteMessage(menuName: string) {
		return `Are you sure you want to delete the menu "${menuName}"?`;
	}
</script>

<!-- TO USE ENTHER AS A TRIGGER: move to a form -->
<!-- Hit enter in an input submit the form -->
<!-- button inside of a form must be typed with button to not trigger -->
<div class="flex flex-row w-full p-3 my-3 border-2 border-slate-400 rounded" data-testid="menu">
	<div class="flex flex-1">
		{#if isRenameModeEnabled}
			<input
				type="text"
				bind:value={menu.name}
				class="font-bold underline underline-offset-4"
				data-testid="name-input"
			/>
		{:else}
			<p data-testid="name">{menu.name}</p>
		{/if}
	</div>
	{#if isRenameModeEnabled}
		<button class="flex" on:click={saveMenu} data-testid="save"> Save </button>
	{:else}
		<button class="flex mx-2" on:click={showModal} data-testid="delete"> Delete </button>
		<button class="flex" on:click={enableRenameMode} data-testid="rename"> Rename </button>
	{/if}
</div>

{#if isModalDisplayed}
	<ConfirmationModal
		message={getDeleteMessage(menu.name)}
		confirmLabel="Confirm"
		closeLabel="Cancel"
		on:close={hideModal}
		on:confirm={removeMenu}
	/>
{/if}
