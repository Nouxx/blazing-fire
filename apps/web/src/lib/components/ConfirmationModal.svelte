<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const CLOSE_EVENT = 'close';
	const CONFIRM_EVENT = 'confirm';

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

<div class="flex flex-col justify-center modal" data-testid="confirmation-modal">
	<dialog
		class="flex flex-col items-center p-5 border-2 border-slate-200 shadow-md rounded [&>*]:my-3"
	>
		<h1 class="text-m">{message}</h1>
		{#if error}
			<p class="text-sm italic text-red-600">{error}</p>
		{/if}
		<div class="flex flex-row justify-center mt-2 [&>*]:mx-2">
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

<style>
	.modal {
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.3);

		& dialog {
			background: var(--color-background-primary);
			color: var(--color-font-primary);
		}
	}
</style>
