<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import MenuName from './MenuName.svelte';
	import type { ActionData } from '../$types';

	export let menu: Menu;
	export let form: ActionData;

	let isRenameModeEnabled = false;
	let initialMenuName: string; // todo: check the name
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

	function getDeleteMessage(menuName: string) {
		return `Are you sure you want to delete the menu "${menuName}"?`;
	}

	onMount(() => {
		initialMenuName = menu.name;
	});

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
	<div class="flex flex-1">
		<MenuName {menu} {form} {isHovered} />
	</div>
	{#if isRenameModeEnabled}
		<button type="submit" class="flex" data-testid="save"> Save </button>
	{:else}
		<button type="button" class="flex mx-2" on:click={showModal} data-testid="delete">
			Delete
		</button>
		<!-- <button type="button" class="flex" on:click={enableRenameMode} data-testid="rename">
			Rename
		</button> -->
	{/if}

	<input type="hidden" name="id" value={menu.id} />
	<input type="hidden" name="initialName" value={initialMenuName} />
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
