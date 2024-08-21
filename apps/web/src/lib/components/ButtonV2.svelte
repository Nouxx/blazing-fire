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
	// todo: use alias
	@use '../../style/colors.scss' as *;

	.button {
		height: 2rem;
		width: 2rem;
		border-radius: 0.375rem;
		padding: 0.375rem;

		& > :global(svg) {
			fill: $color-secondary-light;
			display: block;
			margin: auto;
			height: 100%;
			width: 100%;
		}

		&:hover {
			background: $color-background-hover-light;

			& > :global(svg) {
				fill: $color-secondary-light-hover;
			}
		}
	}

	:global(body.dark) .button {
		& > :global(svg) {
			fill: $color-secondary-dark;
		}

		&:hover {
			background: $color-background-hover-dark;

			& > :global(svg) {
				fill: $color-secondary-dark-hover;
			}
		}
	}
</style>
