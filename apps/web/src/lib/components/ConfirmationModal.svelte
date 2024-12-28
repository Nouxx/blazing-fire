<script lang="ts">
	import Button from './Button.svelte';
	import type { Modal } from '$lib/stores/modalStore';

	export let modal: Modal;
</script>

<div class="modal__overlay" data-testid="confirmation-modal">
	<dialog class="modal__content">
		<div class="modal__message">
			<svelte:component this={modal.content.component} {...modal.content.props} />
		</div>
		{#if modal.error}
			<p class="modal__message--error">{modal.error}</p>
		{/if}
		<div class="modal__actions">
			<Button
				variant="primary"
				label={modal.closeLabel}
				type="button"
				on:click={modal.onClose}
				disabled={modal.disabled}
				dataTestId="close"
			/>
			<Button
				type="button"
				variant="primary"
				label={modal.confirmLabel}
				disabled={modal.disabled}
				on:click={modal.onConfirm}
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
			border-radius: 0.5rem;
			background: var(--color-background-tertiary);
			color: var(--color-font-primary);
			filter: drop-shadow(var(--shadow-color) 0.25rem 0.25rem 10px);
		}

		&__message {
			padding: 1.25rem;
			&--error {
				font-size: 0.875rem;
				line-height: 1.25rem;
				font-style: italic;
				color: var(--color-font-error);
				padding: .5rem; 
			}
		}

		&__actions {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
			background: var(--color-background-FORTH);
			width: 100%;
			padding: 1.25rem;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}
	}
</style>
