<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonTag, ButtonVariant } from './types/button';

	const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	export let tag: ButtonTag = 'button';
	export let variant: ButtonVariant = "primary";
	export let dataTestId: string | null = null;
	export let href: string | null = null;
	export let disabled: boolean = false;

	if (tag === 'a' && !href) {
		console.error('"href" attribute is not defined in the MiniButton component');
	}

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}
</script>

{#if tag === 'button'}
	<button
		class="mini-button mini-button__{variant}"
		on:click={handleClick}
		data-testid={dataTestId}
		{disabled}
	>
		<slot />
	</button>
{/if}

{#if tag === 'a'}
	<a {href} class="mini-button mini-button__{variant}" data-testid={dataTestId}>
		<slot />
	</a>
{/if}

<style lang="scss">
	$button-variants: (
		primary: (
			background: var(--mini-button-color-background-primary),
			background-hover: var(--mini-button-color-background-primary-hover),
			content: var(--mini-button-color-content-primary),
			content-hover: var(--mini-button-color-content-primary-hover)
		),
		secondary: (
			background: var(--mini-button-color-background-secondary),
			background-hover: var(--mini-button-color-background-secondary-hover),
			content: var(--mini-button-color-content-secondary),
			content-hover: var(--mini-button-color-content-secondary-hover)
		),
		tertiary: (
			background: var(--mini-button-color-background-tertiary),
			background-hover: var(--mini-button-color-background-tertiary-hover),
			content: var(--mini-button-color-content-tertiary),
			content-hover: var(--mini-button-color-content-tertiary-hover)
		),
		neutral-primary: (
			background: var(--button-color-background-neutral-primary),
			background-hover: var(--button-color-background-neutral-primary-hover),
			content: var(--button-color-content-neutral-primary),
			content-hover: var(--button-color-content-neutral-primary-hover)
		),
		neutral-secondary: (
			background: var(--button-color-background-neutral-secondary),
			background-hover: var(--button-color-background-neutral-secondary-hover),
			content: var(--button-color-content-neutral-secondary),
			content-hover: var(--button-color-content-neutral-secondary-hover)
		),
		error: (
			background: var(--button-color-background-error),
			background-hover: var(--button-color-background-error-hover),
			content: var(--button-color-content-error),
			content-hover: var(--button-color-content-error-hover)
		)
	);

	.mini-button {
		display: flex;
		height: 2rem;
		width: 2rem;
		border-radius: 0.375rem;
		padding: 0.375rem;

		& > :global(svg) {
			display: block;
			margin: auto;
			height: 100%;
			width: 100%;
		}

		@each $variant, $properties in $button-variants {
			&__#{$variant} {
				background: map-get($properties, background);

				& > :global(svg) {
					fill: map-get($properties, content);
				}

				&:hover {
					background: map-get($properties, background-hover);

					& > :global(svg) {
						fill: map-get($properties, content-hover);
					}
				}

				&:disabled {
					background: map-get($properties, background-hover);
				}
			}
		}

		&:disabled {
			& > :global(svg) {
				fill: var(--mini-button-color-content-disabled);
			}
		}
	}
</style>
