<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const CLOSE_EVENT_NAME = 'close';
	const CONFIRM_EVENT = 'confirm';

	export let message: string;
	export let closeLabel: string;
	export let confirmLabel: string;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch(CLOSE_EVENT_NAME);
	}

	function handleConfirm() {
		dispatch(CONFIRM_EVENT);
	}
</script>

<div class="flex flex-col justify-center modal" data-testid="confirmation-modal">
	<dialog class="flex flex-col p-5 border-2 border-slate-200 shadow-md rounded">
		<h1 class="text-sm my-3">{message}</h1>
		<div class="flex flex-row justify-center">
			<button
				on:click={handleClose}
				class="p-1 m-3 px-3 border-2 text-center border-slate-200 shadow-md rounded"
                data-testid="close"
			>
				{closeLabel}
			</button>

			<button
				on:click={handleConfirm}
				class="p-1 m-3 px-3 border-2 text-center border-red-800 bg-red-500 text-white shadow-md rounded"
                data-testid="confirm"
			>
				{confirmLabel}
			</button>
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
	}
</style>
