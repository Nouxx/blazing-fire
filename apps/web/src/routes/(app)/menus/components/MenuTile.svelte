<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import MenuName from './MenuName.svelte';
	import MenuRenameAction from './MenuRenameAction.svelte';
	import type { ActionData } from '../$types';

	export let menu: Menu;
	export let form: ActionData; // todo: understand about action data form type

	let isRenameModeEnabled = false;
	let initialMenuName: string; // todo: check the name
	let isModalDisplayed = false;

	function showModal() {
		isModalDisplayed = true;
	}

	function hideModal() {
		isModalDisplayed = false;
	}

	function getDeleteMessage(menuName: string) {
		return `Are you sure you want to delete the menu "${menuName}"?`;
	}

	onMount(() => {
		initialMenuName = menu.name;
	});

	function handleRename(event) {
		isRenameModeEnabled = event.detail;
	}

	let isHovered = false;
</script>

<div
	class="flex flex-row w-full p-3 my-3 border-2 border-slate-400 rounded"
	data-testid="menu"
	role="listitem"
	on:mouseenter={() => {
		isHovered = true;
	}}
	on:mouseleave={() => {
		isHovered = false;
	}}
>
	<div class="flex flex-1 w-full">
		<MenuName bind:menu editionMode={isRenameModeEnabled} />
	</div>

	<MenuRenameAction bind:menu {isHovered} {form} on:renameEnabled={handleRename} />

	<button type="button" class="italic mx-2" on:click={showModal} data-testid="delete">
		Delete
	</button>
</div>

<form method="post" action="?/deleteMenu" use:enhance>
	<input type="hidden" name="id" value={menu.id} />
	{#if isModalDisplayed}
		<ConfirmationModal
			message={getDeleteMessage(menu.name)}
			confirmLabel="Confirm"
			closeLabel="Cancel"
			on:close={hideModal}
		/>
	{/if}
</form>
