<script lang="ts">
	import type { Menu } from '$lib/types/menu';

	const NAME_CHARACTERS_LIMIT = 40;

	export let menu: Menu;
	export let editionMode: boolean;

	$: {
		if (menu.name.length > NAME_CHARACTERS_LIMIT) {
			menu.name = menu.name.slice(0, menu.name.length - 1);
		}
	}
</script>

<div class="flex flex-col w-full justify-center">
	{#if editionMode}
		<input
			type="text"
			name="name"
			bind:value={menu.name}
			class="outline-none bg-inherit"
			class:underline={editionMode}
			class:underline-offset-4={editionMode}
			data-testid="name-input"
			autocomplete="off"
		/>
		<p class="text-xs text-slate-500">{menu.name.length}/{NAME_CHARACTERS_LIMIT}</p>
	{:else}
		<p>
			{menu.name}
		</p>
	{/if}
</div>
