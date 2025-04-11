<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import XMarkIcon from './icons/XMarkIcon.svelte';
	import MiniButton from './MiniButton.svelte';

	export let dismissable: boolean = true;

	const dispatch = createEventDispatcher();

	function handleDismiss() {
		dispatch('dismiss');
	}
</script>

<div class="message">
	<slot />
	{#if dismissable}
		<button on:click={handleDismiss}>
			<MiniButton variant="error">
				<XMarkIcon />
			</MiniButton>
		</button>
	{/if}
</div>

<style lang="scss">
	@use '../../style' as *;

	.message {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: $spacing-8;

		border-radius: 0.5rem;
		border: 1px solid var(--box-color-border-error);

		background-color: var(--color-background-error);
		color: var(--color-font-tertiary);
	}
</style>
