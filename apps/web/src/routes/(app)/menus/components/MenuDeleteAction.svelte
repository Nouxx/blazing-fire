<script lang="ts">
	import { enhance } from '$app/forms';

	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';
	import { modalStore, type Modal } from '$lib/stores/modalStore';

	import type { Menu } from '$lib/types/menu';
	import type { SubmitFunction } from '../$types';

	export let menu: Menu;
	export let disabled: boolean;

	export let formElement: HTMLFormElement;

	const ERROR_LABEL = 'Whoops! We cannot delete the menu. Please try again later.';
	const MODAL_MESSAGE = `Are you sure you want to delete the menu "${menu.name}"?`;

	let isModalDisplayed = false;
	let isLoading = false;
	let error: string | undefined = undefined;

	function showModal() {
		isModalDisplayed = true;
		const modal: Modal = {
			message: MODAL_MESSAGE,
			confirmLabel: 'Delete',
			closeLabel: 'Cancel',
			disabled: isLoading,
			onClose: () => modalStore.reset(),
			onConfirm: () => submitForm()
		};
		modalStore.set(modal);
	}

	function submitForm() {
		formElement.requestSubmit();
		modalStore.reset();
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

<form bind:this={formElement} method="post" action="?/deleteMenu" use:enhance={submitFunction}>
	<input type="hidden" name="id" value={menu.id} />
</form>
