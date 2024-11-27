<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let disabled: boolean;
	export let name: string;
	export let charactersLimit: number | undefined = undefined;

	interface TextInputEvents {
		input: string;
		focusIn: null;
		focusOut: null;
	}

	const dispatch = createEventDispatcher<TextInputEvents>();

	function handleInput() {
		dispatch('input', value);
	}
	function handleFocusIn() {
		dispatch('focusIn');
	}
	function handleFocusOut() {
		dispatch('focusOut');
	}

	$: {
		if (charactersLimit && charactersLimit > 0) {
			if (value.length > charactersLimit) {
				value = value.slice(0, value.length - 1);
			}
		}
	}
</script>

<div class="input">
	<input
		type="text"
		class="input__field"
		{name}
		bind:value
		autocomplete="off"
		{disabled}
		on:input={handleInput}
		on:focusin={handleFocusIn}
		on:focusout={handleFocusOut}
	/>
	{#if charactersLimit}
		<p class="input__counter">{value.length}/{charactersLimit}</p>
	{/if}
	<div></div>
</div>

<style lang="scss">
	.input {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		padding: 0.5rem;

		border-radius: 8px;
		background-color: var(--input-color-background-primary);

		&__field {
			outline: none;
			background-color: var(--input-color-background-primary);
		}

		&__counter {
			font-size: 0.875rem;
		}
	}
</style>
