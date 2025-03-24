<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import LoadingSpinner from './atoms/LoadingSpinner.svelte';
	import TriangleExclamation from './icons/TriangleExclamation.svelte';
	import Icon from './atoms/Icon.svelte';
	import CheckIcon from './icons/CheckIcon.svelte';
	import type { TextInputState } from './types/input';

	type HTMLInput = 'text' | 'password' | 'email';

	export let value: string;
	export let name: string;
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
	export let charactersLimit: number | undefined = undefined;
	export let dataTestId: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let type: HTMLInput = 'text';

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
		focusIn: { value: string };
		focusOut: { value: string };
	}

	const dispatch = createEventDispatcher<TextInputEvents>();

	function handleFocusIn() {
		dispatch('focusIn', { value });
	}
	function handleFocusOut() {
		dispatch('focusOut', { value });
	}
</script>

<div class="text-input">
	<label for={name} class="text-input__label">{label}</label>
	<div class="text-input__wrapper">
		{#if type === 'text'}
			<input
				type="text"
				class="text-input__control"
				{name}
				{placeholder}
				bind:value
				autocomplete="off"
				{disabled}
				on:focusin={handleFocusIn}
				on:focusout={handleFocusOut}
				data-testid={dataTestId}
			/>
		{/if}

		{#if type === 'password'}
			<input
				type="password"
				class="text-input__control"
				{name}
				{placeholder}
				bind:value
				autocomplete="off"
				{disabled}
				on:focusin={handleFocusIn}
				on:focusout={handleFocusOut}
				data-testid={dataTestId}
			/>
		{/if}

		{#if type === 'email'}
			<input
				type="email"
				class="text-input__control"
				{name}
				{placeholder}
				bind:value
				autocomplete="off"
				{disabled}
				on:focusin={handleFocusIn}
				on:focusout={handleFocusOut}
				data-testid={dataTestId}
			/>
		{/if}

		{#if state == 'loading'}
			<div class="text-input__feedback">
				<LoadingSpinner variant="primary" />
			</div>
		{/if}

		{#if state == 'error'}
			<div class="text-input__feedback">
				<Icon variant="error">
					<TriangleExclamation />
				</Icon>
			</div>
		{/if}

		{#if state == 'success' && showSuccess}
			<div class="text-input__feedback" transition:fade>
				<Icon variant="success">
					<CheckIcon />
				</Icon>
			</div>
		{/if}

		{#if charactersLimit}
			<p class="text-input__counter">{value.length}/{charactersLimit}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../style' as *;

	.text-input {
		display: flex;
		flex-direction: column;
		gap: $spacing-8;

		&__label {
			@include font-body-bold;
		}

		&__wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: var(--input-color-background-primary);
			padding: $spacing-16;
			border-radius: 8px;
		}

		&__control {
			flex-grow: 1;
			outline: none;
			background-color: inherit;
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
