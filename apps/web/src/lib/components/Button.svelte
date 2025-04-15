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
	export let fullWidth: boolean = false;
	export let fullHeight: boolean = false;

	const shadowClass = shadow ? `button__${variant}--shadow` : '';
	const fullWidthClass = fullWidth ? `button__${variant}--full-width` : '';
	const fullHeightClass = fullHeight ? `button__${variant}--full-height` : '';

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
		class="button button__{variant} {shadowClass} {fullWidthClass} {fullHeightClass}"
		{type}
		on:click={handleClick}
		{disabled}
		data-testid={dataTestId}
	>
		{label}
	</button>
{/if}

<style lang="scss">
	@use '../../style' as *;

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
		padding-top: $spacing-8;
		padding-bottom: $spacing-8;
		padding-left: $spacing-16;
		padding-right: $spacing-16;

		height: $spacing-32;
		width: fit-content;

		text-align: center;

		@include font-button;
		line-height: $spacing-16;

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
					box-shadow: 0 0.125rem 0.125rem var(--shadow-color);
				}

				&--full-width {
					width: 100%;
				}

				&--full-height {
					height: 100%;
				}
			}
		}
	}
</style>
