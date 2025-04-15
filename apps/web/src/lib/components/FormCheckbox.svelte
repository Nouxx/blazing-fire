<script lang="ts">
	export let name: string;
</script>

<div class="form-checkbox">
	<input id={name} type="checkbox" class="form-checkbox__control" />
	<label for={name} class="form-checkbox__label">
		<slot />
	</label>
</div>

<style lang="scss">
	@use '../../style/' as *;

	.form-checkbox {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: $spacing-8;

		cursor: pointer;

		&__control {
			$checkbox-dimension: 16px;
			$outer-radius: 3px;

			appearance: none;
			position: relative;
			background-color: var(--input-color-background-primary);
			border-radius: $outer-radius;
			height: $checkbox-dimension;
			width: $checkbox-dimension;

			cursor: inherit;

			&::before {
				content: '';
				position: absolute;

				$padding-factor: 0.25;
				$inner-padding: calc(#{$checkbox-dimension} * #{$padding-factor});
				$inner-radius: 2px;

				top: $inner-padding;
				left: $inner-padding;
				border-radius: $inner-radius;
				width: calc(#{$checkbox-dimension} - 2 * #{$inner-padding});
				height: calc(#{$checkbox-dimension} - 2 * #{$inner-padding});

				background-color: var(--input-color-background-secondary);
				opacity: 0;
				transition: opacity 0.2s;
			}

			&:checked {
				&::before {
					opacity: 1;
				}
			}
		}

		&__label {
			cursor: inherit;
			@include font-small(var(--color-font-primary));
		}
	}
</style>
