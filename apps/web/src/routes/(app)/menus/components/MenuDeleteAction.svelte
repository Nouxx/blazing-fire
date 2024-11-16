<script lang="ts">
	import { enhance } from '$app/forms';

	import { modalStore, type Modal } from '$lib/stores/modalStore';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import MiniButton from '$lib/components/MiniButton.svelte';
	import type { Menu } from '$lib/types/menu';
	import type { SubmitFunction } from '../$types';

	export let menu: Menu;
	export let disabled: boolean;

	let formElement: HTMLFormElement;

	const ERROR_LABEL = 'Whoops! We cannot delete the menu. Please try again later.';
	const MODAL_MESSAGE = `Are you sure you want to delete the menu "${menu.name}"?`;

	function showModal() {
		const modal: Modal = {
			message: MODAL_MESSAGE,
			confirmLabel: 'Delete',
			closeLabel: 'Cancel',
			disabled: false,
			onClose: () => modalStore.close(),
			onConfirm: () => submitForm()
		};
		modalStore.open(modal);
	}

	function submitForm() {
		formElement.requestSubmit();
	}

	function hideModal() {
		modalStore.close();
	}

	const submitFunction: SubmitFunction = () => {
		modalStore.setProperty('disabled', true);
		return async ({ result, update }) => {
			if (result.type === 'success') {
				hideModal();
			} else {
				modalStore.setProperty('error', ERROR_LABEL);
			}
			modalStore.setProperty('disabled', false);
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
