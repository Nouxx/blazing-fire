<script lang="ts">
	export let variant: 'primary' | 'secondary';
</script>

<div class="wrapper wrapper__{variant}">
	<slot />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;

		// padding: 0.25rem;

		height: 100%;
		width: 2rem;

		box-sizing: border-box;
		border: 1px solid violet;

		& > :global(svg) {
			max-width: 100%;
			max-height: 100%;
		}

		&__primary {
			& > :global(svg) {
				fill: red;
			}
		}

		&__secondary {
			& > :global(svg) {
				fill: blue;
			}
		}
	}
</style>
