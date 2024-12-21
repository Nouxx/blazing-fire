<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonTag, ButtonType, ButtonVariant } from './types/button';

	const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	export let tag: ButtonTag = 'button';
	export let variant: ButtonVariant;
	export let label: string;
	export let dataTestId: string;
	export let type: ButtonType = 'button';
	export let disabled = false;
	export let href: string | null = null;
	export let shadow: boolean = false;

	const shadowClass = shadow ? `button__${variant}--shadow` : '';

	if (tag === 'a' && !href) {
		console.error('"href" attribute is not defined in the Button component');
	}

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}
</script>

{#if tag === 'a'}
	<a class="button button__{variant}" {href} data-testid={dataTestId}>{label}</a>
{/if}

{#if tag === 'button'}
	<button
		class="button button__{variant} {shadowClass}"
		{type}
		on:click={handleClick}
		{disabled}
		data-testid={dataTestId}
	>
		{label}
	</button>
{/if}

<style lang="scss">
	$button-variants: (
		primary: (
			background: var(--button-color-background-primary),
			content: var(--button-color-content-primary),
			hover: var(--button-color-background-primary-hover)
		),
		secondary: (
			background: var(--button-color-background-secondary),
			content: var(--button-color-content-secondary),
			hover: var(--button-color-background-secondary-hover)
		),
		tertiary: (
			background: var(--button-color-background-tertiary),
			content: var(--button-color-content-tertiary),
			hover: var(--button-color-background-tertiary-hover)
		)
	);

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

		@each $variant, $properties in $button-variants {
			&__#{$variant} {
				background: map-get($properties, background);
				color: map-get($properties, content);

				&:hover {
					background: map-get($properties, hover);
				}

				&:disabled {
					background: var(--button-color-background-disabled);
				}

				&--shadow {
					filter: drop-shadow(var(--shadow-color) 0.25rem 0.25rem 10px);
				}
			}
		}
	}
</style>
