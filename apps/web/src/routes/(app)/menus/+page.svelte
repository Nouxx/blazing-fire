<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import type { Menu } from '$lib/types/menu.js';
	import type { ActionData } from './$types.js';
	import MenuTile from './components/MenuTile.svelte';

	export let form: ActionData; // todo: understand about action data form type
	export let data;

	let editionMode = false;
	let isDeletionModalDisplayed = false;
	let menuToDelete: Menu;

	function toggleEditionMode(value?: boolean): void {
		if (value !== undefined) {
			editionMode = value;
			return;
		}
		editionMode = !editionMode;
	}

	function handleDelete(event: { detail: Menu }) {
		isDeletionModalDisplayed = true;
		menuToDelete = event.detail;
	}

	function getDeleteMessage(menuName: string) {
		return `Are you sure you want to delete the menu "${menuName}"?`;
	}

	function hideModal() {
		isDeletionModalDisplayed = false;
	}

	$: {
		if (data.menus.length === 0) {
			toggleEditionMode(false);
		}
	}
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<h1 class="text-3xl font-bold my-3 mb-8">Your Menus</h1>

	{#if data.menus.length === 0}
		<p class="mb-2">You don't have any menu yet.</p>
	{/if}

	{#if data.menus.length > 0}
		{#each data.menus as menu}
			<MenuTile {menu} {editionMode} on:delete={handleDelete} />
		{/each}
	{/if}

	<div data-testid="actions" class="flex flex-row">
		{#if editionMode}
			<form method="post" action="?/editMenus">
				<!-- disguting  -->
				{#each data.menus as menu, index}
					<input type="hidden" name={'obj' + index} value={JSON.stringify(menu)} />
				{/each}
				<Button type="submit" label="Save" id="save" />
				<Button label="Cancel" id="cancel" on:click={() => toggleEditionMode(false)} />
			</form>
		{:else if data.menus.length > 0}
			<Button label="Edit" id="edit" on:click={() => toggleEditionMode(true)} />
		{/if}
	</div>

	{#if !editionMode}
		<form method="POST" action="?/createMenu">
			<Button type="submit" label="New menu" id="new-menu" />
		</form>
	{/if}

	{#if isDeletionModalDisplayed}
		<form
			method="post"
			action="?/deleteMenu"
			use:enhance={() => {
				return async ({ update }) => {
					hideModal();
					update();
				};
			}}
		>
			<input type="hidden" name="id" value={menuToDelete.id} />
			<ConfirmationModal
				message={getDeleteMessage(menuToDelete.name)}
				confirmLabel="Confirm"
				closeLabel="Cancel"
				on:close={hideModal}
			/>
		</form>
	{/if}
</div>
