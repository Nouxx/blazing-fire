<script lang="ts">
	import SpinnerIcon from '../icons/SpinnerIcon.svelte';
	import type { IconVariant } from '../types/icon';
	import Icon from './Icon.svelte';

	export let variant: IconVariant;
</script>

<div class="loading-spinner">
	<Icon {variant}>
		<SpinnerIcon />
	</Icon>
</div>

<style lang="scss">
	.loading-spinner {
		height: inherit;
		display: flex;
		flex-direction: row;
		align-items: center;

		:global(svg) {
			animation: spin-animation 1s infinite;
			display: inline-block;

			@keyframes spin-animation {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(359deg);
				}
			}
		}
	}
</style>
