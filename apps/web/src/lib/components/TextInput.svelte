<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import LoadingSpinner from './atoms/LoadingSpinner.svelte';
	import TriangleExclamation from './icons/TriangleExclamation.svelte';
	import Icon from './atoms/Icon.svelte';
	import CheckIcon from './icons/CheckIcon.svelte';
	import type { TextInputState } from './types/input';

	export let value: string;
	export let disabled: boolean;
	export let name: string;
	export let charactersLimit: number | undefined = undefined;

	export function setState(newState: TextInputState) {
		state = newState;
	}

	let state: TextInputState = undefined;
	let showSuccess: boolean;

	$: {
		if (charactersLimit && charactersLimit > 0) {
			if (value.length > charactersLimit) {
				value = value.slice(0, value.length - 1);
			}
		}
	}

	$: {
		if (state === 'success') {
			showSuccess = true;
			setTimeout(() => (showSuccess = false), 1000);
		}
	}

	interface TextInputEvents {
		focusIn: null;
		focusOut: null;
	}

	const dispatch = createEventDispatcher<TextInputEvents>();

	function handleFocusIn() {
		dispatch('focusIn');
	}
	function handleFocusOut() {
		dispatch('focusOut');
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
		on:focusin={handleFocusIn}
		on:focusout={handleFocusOut}
	/>

	{#if state == 'loading'}
		<div class="input__feedback">
			<LoadingSpinner variant="primary" />
		</div>
	{/if}

	{#if state == 'error'}
		<div class="input__feedback">
			<Icon variant="error">
				<TriangleExclamation />
			</Icon>
		</div>
	{/if}

	{#if state == 'success' && showSuccess}
		<div class="input__feedback" transition:fade>
			<Icon variant="success">
				<CheckIcon />
			</Icon>
		</div>
	{/if}

	{#if charactersLimit}
		<p class="input__counter">{value.length}/{charactersLimit}</p>
	{/if}
</div>

<style lang="scss">
	.input {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		padding: 0.5rem;
		height: 2.625rem;

		border-radius: 8px;
		background-color: var(--input-color-background-primary);

		&__field {
			flex-grow: 1;
			outline: none;
			background-color: var(--input-color-background-primary);
		}

		&__counter {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 0.875rem;
		}

		&__feedback {
			height: 100%;
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
		}
	}
</style>
