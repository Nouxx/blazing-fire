<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import type { Modal } from '$lib/stores/modalStore';

	const CLOSE_EVENT = 'close';
	const CONFIRM_EVENT = 'confirm';

	// todo: the component should accept an object

	// export let modal: Modal

	export let message: string;
	export let closeLabel: string;
	export let confirmLabel: string;
	export let disabled = false;
	export let error: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch(CLOSE_EVENT);
	}

	function handleConfirm() {
		dispatch(CONFIRM_EVENT);
	}
</script>

<div class="modal__overlay fixed inset-0" data-testid="confirmation-modal">
	<dialog class="modal__content">
		<h1 class="modal__message">{message}</h1>
		{#if error}
			<p class="modal__message--error">{error}</p>
		{/if}
		<div class="modal__actions">
			<Button
				variant="primary"
				label={closeLabel}
				type="button"
				on:click={handleClose}
				{disabled}
				dataTestId="close"
			/>
			<Button
				variant="primary"
				label={confirmLabel}
				type="submit"
				{disabled}
				on:click={handleConfirm}
				dataTestId="confirm"
			/>
		</div>
	</dialog>
</div>

<style lang="scss">
	.modal {
		&__overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 1000;
		}

		&__content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.25rem;
			padding: 1.25rem;
			background: var(--color-background-primary);
			color: var(--color-font-primary);
		}

		&__message {
			&--error {
				font-size: 0.875rem;
				line-height: 1.25rem;
				font-style: italic;
				color: var(--color-error);
			}
		}

		&__actions {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
		}
	}
</style>
