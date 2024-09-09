<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';

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

<Button variant="primary" label="Delete" dataTestId="delete" on:click={showModal} {disabled} />

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
