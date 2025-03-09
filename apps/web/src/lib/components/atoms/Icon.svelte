<script lang="ts">
	import type { IconVariant } from '../types/icon';

	export let variant: IconVariant;
</script>

<div class="icon icon__{variant}">
	<slot />
</div>

<style lang="scss">
	.icon {
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

		&__secondary {
			& > :global(svg) {
				fill: var(--icon-color-secondary);
			}
		}

		&__success {
			& > :global(svg) {
				fill: var(--icon-color-success);
			}
		}

		&__error {
			& > :global(svg) {
				fill: var(--icon-color-error);
			}
		}
	}
</style>
