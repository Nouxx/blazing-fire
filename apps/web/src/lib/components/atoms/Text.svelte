<script lang="ts">
	import type { TextColor, TextFont } from '../types/text';

	export let font: TextFont = 'body';
	export let color: TextColor = 'primary';

	const fontClass = `font-${font}`;
	const colorClass = `color-${color}`;
</script>

<span class="text {fontClass} {colorClass}"><slot /></span>

<style lang="scss">
	@use '../../../style' as *;

	.text {
		@include font-body;
	}

	.font {
		&-heading {
			@include font-heading;
		}

		&-sub-heading {
			@include font-sub-heading;
		}

		&-body {
			@include font-body;
		}

		&-body-bold {
			@include font-body-bold;
		}

		&-button {
			@include font-button;
		}

		&-small {
			@include font-small;
		}
	}

	.color {
		&-primary {
			color: var(--color-font-primary);
		}

		&-secondary {
			color: var(--color-font-secondary);
		}

		&-error {
			color: var(--color-font-error);
		}
	}
</style>
