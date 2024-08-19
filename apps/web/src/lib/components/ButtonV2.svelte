<script lang="ts">
	import MoonIcon from './icons/MoonIcon.svelte';
</script>

<button class="button">
	<MoonIcon />
</button>

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

			& .button__icon {
				fill: $color-new-light-hover;
			}
		}
	}
</style>
