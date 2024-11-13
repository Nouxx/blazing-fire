<script lang="ts">
	import { enhance } from '$app/forms';

	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';

	import type { Menu } from '$lib/types/menu';
	import type { SubmitFunction } from '../$types';

	export let menu: Menu;
	export let disabled: boolean;

	const ERROR_LABEL = 'Whoops! We cannot delete the menu. Please try again later.';
	const MODAL_MESSAGE = `Are you sure you want to delete the menu "${menu.name}"?`;

	let isModalDisplayed = false;
	let isLoading = false;
	let error: string | undefined = undefined;

	function showModal() {
		isModalDisplayed = true;
	}

	function hideModal() {
		isModalDisplayed = false;
	}

	const submitFunction: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				error = undefined;
				hideModal();
			} else {
				error = ERROR_LABEL;
			}
			isLoading = false;
			update();
		};
	};
</script>

<MiniButton tag="button" variant="secondary" dataTestId="delete" on:click={showModal} {disabled}>
	<TrashIcon />
</MiniButton>

{#if isModalDisplayed}
	<form method="post" action="?/deleteMenu" use:enhance={submitFunction}>
		<input type="hidden" name="id" value={menu.id} />
		<ConfirmationModal
			message={MODAL_MESSAGE}
			confirmLabel="Confirm"
			closeLabel="Cancel"
			disabled={isLoading}
			{error}
			on:close={hideModal}
		/>
	</form>
{/if}
