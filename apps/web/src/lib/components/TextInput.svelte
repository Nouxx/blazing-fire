<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LoadingSpinner from './atoms/LoadingSpinner.svelte';
	import TriangleExclamation from './icons/TriangleExclamation.svelte';
	import type { TextInputState } from './types/input';
	import Icon from './atoms/Icon.svelte';
	import CheckIcon from './icons/CheckIcon.svelte';
	import { fade } from 'svelte/transition';

	export let value: string;
	export let disabled: boolean;
	export let name: string;
	export let state: TextInputState | undefined = undefined;
	export let charactersLimit: number | undefined = undefined;

	let showSuccess: boolean;

	if (state === 'success') {
		showSuccess = true;
	}

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

	$: {
		if (showSuccess) {
			setTimeout(() => (showSuccess = false), 1000);
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
	{#if state == 'loading'}
		<div class="input__feedback input__feedback--loading">
			<LoadingSpinner variant="primary" />
		</div>
	{/if}
	{#if state == 'error'}
		<div class="input__feedback input__feedback--error">
			<Icon variant="primary">
				<TriangleExclamation />
			</Icon>
		</div>
	{/if}
	{#if state == 'success' && showSuccess}
		<div class="input__feedback input__feedback--success" transition:fade>
			<Icon variant="primary">
				<CheckIcon />
			</Icon>
		</div>
	{/if}
	<!-- todo: replace character count with loading spinner and check marck -->
</div>

<style lang="scss">
	.input {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		padding: 0.5rem;
		height: 40px;

		border-radius: 8px;
		background-color: var(--input-color-background-primary);

		&__field {
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
		&--loading {
		}
		&--error {
		}
	}
</style>
