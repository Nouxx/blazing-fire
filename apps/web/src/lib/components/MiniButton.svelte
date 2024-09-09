<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonTag, ButtonVariant } from './types/button';

	const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	export let tag: ButtonTag = 'button';
	export let variant: ButtonVariant;
	export let dataTestId: string;
	export let href: string | null = null;

	if (tag === 'a' && !href) {
		throw new Error('"href" attribute is not defined in the MiniButton component');
	}

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}
</script>

{#if tag === 'button'}
	<button class="button {variant}" on:click={handleClick} data-testid={dataTestId}>
		<slot />
	</button>
{/if}

{#if tag === 'a'}
	<a {href} class="button {variant}" data-testid={dataTestId}>
		<slot />
	</a>
{/if}

<style lang="scss">
	.button {
		height: 2rem;
		width: 2rem;
		border-radius: 0.375rem;
		padding: 0.375rem;

		&.primary {
			background: var(--button-color-background-primary);
			& > :global(svg) {
				fill: var(--button-content-color-primary);
			}
		}

		&.secondary {
			background: var(--button-color-background-secondary);
			& > :global(svg) {
				fill: var(--button-content-color-secondary);
			}
		}

		& > :global(svg) {
			display: block;
			margin: auto;
			height: 100%;
			width: 100%;
		}

		&:hover {
			&.primary {
				background: var(--button-color-background-primary-hover);
				& > :global(svg) {
					fill: var(--button-content-color-primary-hover);
				}
			}

			&.secondary {
				background: var(--button-color-background-secondary-hover);
				& > :global(svg) {
					fill: var(--button-content-color-secondary-hover);
				}
			}
		}
	}
</style>
