<script lang="ts">
	import '../app.scss';
</script>

<noscript>
	<div class="w-full bg-red-200 text-center py-1">
		<p class="text-sm">JavaScript is blocked by your browser, you might experience issues</p>
	</div>
</noscript>

<slot />

<style lang="scss">
	:global(body) {
		background: var(--color-background-primary);
		color: var(--color-font-primary);
	}
</style>
