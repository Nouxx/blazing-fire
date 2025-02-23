<script lang="ts">
	import type { Menu } from '$lib/types/menu';

	export let menu: Menu;
</script>

<div class="content">
	<p>You're about to delete the menu "{menu.name}".</p>
	<p>It will be gone forever.</p>
</div>

<style lang="scss">
	.content {
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		* {
			text-align: center;
		}
	}
</style>
