<script lang="ts">
	export let type: 'button' | 'link';
	export let href: string | null = null;
</script>

{#if type === 'button'}
	<button class="button">
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
		background: $color-new-bg-light;
		border-radius: 0.375rem;
		padding: 0.375rem;

		& > :global(svg) {
			fill: $color-new-light;
			display: block;
			margin: auto;
			height: 100%;
			width: 100%;
		}

		&:hover {
			background: $color-new-bg-light-hover;

			& > :global(svg) {
				fill: $color-new-light-hover;
			}
		}
	}
</style>
