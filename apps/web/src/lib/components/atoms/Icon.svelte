<script lang="ts">
	import type { IconVariant } from '../types/icon';

	export let variant: IconVariant;
</script>

<div class="wrapper wrapper__{variant}">
	<slot />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 2rem;

		& > :global(svg) {
			max-width: 100%;
			max-height: 100%;
		}

		&__primary {
			& > :global(svg) {
				fill: var(--icon-color-primary);
			}
		}
	}
</style>
