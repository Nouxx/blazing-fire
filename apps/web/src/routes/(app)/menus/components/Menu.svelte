<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';

	export let menu: Menu;

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
</script>

<!-- TO USE ENTHER AS A TRIGGER: move to a form -->
<!-- Hit enter in an input submit the form -->
<!-- button inside of a form must be typed with button to not trigger -->
<!-- should I make this working without JS? in v2? -->

<form
	class="flex flex-row w-full p-3 my-3 border-2 border-slate-400 rounded"
	data-testid="menu"
	method="post"
	action="?/renameMenu"
>
	<div class="flex flex-1">
		{#if isRenameModeEnabled}
			<input
				type="text"
				name="name"
				bind:value={menu.name}
				class="font-bold underline underline-offset-4"
				data-testid="name-input"
			/>
		{:else}
			<p data-testid="name">{menu.name}</p>
		{/if}
	</div>
	{#if isRenameModeEnabled}
		<button type="submit" class="flex" data-testid="save"> Save </button>
	{:else}
		<button type="button" class="flex mx-2" on:click={showModal} data-testid="delete">
			Delete
		</button>
		<button type="button" class="flex" on:click={enableRenameMode} data-testid="rename">
			Rename
		</button>
	{/if}

	<input type="hidden" name="id" value={menu.id} />
</form>

<!-- todo: enhance -->
<form method="post" action="?/deleteMenu">
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
