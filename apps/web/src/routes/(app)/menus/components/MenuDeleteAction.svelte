<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';

	import type { Menu } from '$lib/types/menu';

	export let menu: Menu;
	export let disabled: boolean;

	let isModalDisplayed = false;

	function showModal() {
		isModalDisplayed = true;
	}

	function hideModal() {
		isModalDisplayed = false;
	}

	function getModalMessage(menuName: string) {
		return `Are you sure you want to delete the menu "${menuName}"?`;
	}
</script>

<Button label="Delete" id="delete" on:click={showModal} {disabled} />

{#if isModalDisplayed}
	<form
		method="post"
		action="?/deleteMenu"
		use:enhance={() => {
			return async ({ update }) => {
				// todo: handle error
				hideModal();
				update();
			};
		}}
	>
		<input type="hidden" name="id" value={menu.id} />
		<ConfirmationModal
			message={getModalMessage(menu.name)}
			confirmLabel="Confirm"
			closeLabel="Cancel"
			on:close={hideModal}
		/>
	</form>
{/if}
