<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'button' | 'link';
	export let variant: 'primary' | 'secondary';

	export let href: string | null = null;

	export const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}
</script>

{#if type === 'button'}
	<button class="button {variant}" on:click={handleClick}>
		<slot />
	</button>
{/if}

{#if type === 'link'}
	<a {href} class="button {variant}">
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
