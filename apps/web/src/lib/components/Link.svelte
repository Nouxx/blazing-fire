<script lang="ts">
	import Text from './atoms/Text.svelte';
	import type { TextColor, TextFont } from './types/text';

	export let href: string;
	export let font: TextFont = 'body';
	export let color: TextColor = 'primary';
	export let dataTestId: string | undefined = undefined;
</script>

<a {href} class="link" data-testId={dataTestId}>
	<Text {font} {color}>
		<slot />
	</Text>
</a>

<style lang="scss">
	@use '../../style/' as *;

	.link {
		cursor: pointer;

		&:hover {
			:global(span) {
				text-decoration: underline;
			}
		}
	}
</style>
