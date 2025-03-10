<script lang="ts">
	export let link: string;
	export let label: string;
</script>

<a href={link} class="link">
	<slot name="icon" />
	<p class="link__label">{label}</p>
</a>

<style lang="scss">
	@use '../../style/' as *;

	.link {
		display: flex;
		flex-direction: row;

		&__label {
			display: flex;
			align-items: center;
			@include font-small(var(--color-font-secondary));
			line-height: $spacing-32;

			&:hover {
				color: var(--color-font-primary);
			}
		}

		&:hover {
			:global(svg) {
				fill: var(--color-font-primary);
			}
		}
	}
</style>
