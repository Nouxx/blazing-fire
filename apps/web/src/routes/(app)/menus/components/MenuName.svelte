<script lang="ts">
	import type { Menu } from '$lib/types/menu';

	export let menu: Menu;
	export let editionMode: boolean;
	// todo: enforce max menu name length?
</script>

{#if editionMode}
	<input
		type="text"
		name="name"
		bind:value={menu.name}
		class="outline-none w-full"
		class:underline={editionMode}
		class:underline-offset-4={editionMode}
		data-testid="name-input"
		autocomplete="off"
		autofocus
	/>
{:else}
	<p>
		{menu.name}
	</p>
{/if}
