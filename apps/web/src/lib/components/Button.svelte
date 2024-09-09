<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonTag, ButtonVariant } from './types/button';

	const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	export let tag: ButtonTag = 'button';
	export let variant: ButtonVariant;
	export let label: string;
	export let dataTestId: string;

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}

	export let href: string | null = null;
</script>

{#if tag === 'a'}
	<a class="button button__{variant}" {href} data-testid={dataTestId}>{label}</a>
{/if}

{#if tag === 'button'}
	<button
		class="button button__{variant}"
		{type}
		on:click={handleClick}
		{disabled}
		data-testid={dataTestId}
	>
		{label}
	</button>
{/if}

<style lang="scss">
	.button {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;

		height: 2rem;
		width: fit-content;

		font-size: 1rem;
		line-height: 1rem;
		text-align: center;

		border-radius: 0.375rem;

		&__primary {
			background: var(--button-color-background-primary);
			color: var(--button-content-color-primary);

			&:hover {
				background: var(--button-color-background-primary-hover);
				color: var(--button-content-color-primary-hover);
			}
		}
	}
</style>
