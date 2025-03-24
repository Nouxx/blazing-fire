<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<a {href} class="link">
	<p class="link__label">{label}</p>
</a>

<style lang="scss">
	@use '../../style/' as *;

	.link {
		@include font-small(var(--color-font-secondary));
		cursor: pointer;

		:hover {
			text-decoration: underline;
		}
	}
</style>
