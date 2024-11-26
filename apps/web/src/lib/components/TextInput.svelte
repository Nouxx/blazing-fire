<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let disabled: boolean;
	export let name: string;
	export let autofocus = false;

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
</script>

<input
	type="text"
	{name}
	bind:value
	autocomplete="off"
	{disabled}
	on:input={handleInput}
	on:focusin={handleFocusIn}
	on:focusout={handleFocusOut}
	{autofocus}
/>

<style lang="scss">
	input {
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		outline: none;
		border-radius: 8px;
		width: fit-content;
		background-color: var(--input-color-background-primary);
	}
</style>
