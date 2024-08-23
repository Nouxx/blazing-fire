<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'button' | 'link';
	export let href: string | null = null;

	export const CLICK_EVENT_NAME = 'click';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(CLICK_EVENT_NAME);
	}
</script>

{#if type === 'button'}
	<button class="button" on:click={handleClick}>
		<slot />
	</button>
{/if}

{#if type === 'link'}
	<a {href} class="button">
		<slot />
	</a>
{/if}

<style lang="scss">
	.button {
		height: 2rem;
		width: 2rem;
		border-radius: 0.375rem;
		padding: 0.375rem;

		& > :global(svg) {
			fill: var(--color-action-primary);
			display: block;
			margin: auto;
			height: 100%;
			width: 100%;
		}

		&:hover {
			background: var(--color-action-secondary);

			& > :global(svg) {
				fill: var(--color-background-tertiary);
			}
		}
	}
</style>
