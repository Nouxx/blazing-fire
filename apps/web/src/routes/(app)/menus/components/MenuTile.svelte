<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MenuName from './MenuName.svelte';

	import type { Menu } from '$lib/types/menu';
	import type { ActionData } from '../$types';

	export let menu: Menu;
	export let editionMode: boolean;

	const dispatch = createEventDispatcher();

	function dispatchDelete() {
		dispatch('delete', menu);
	}
</script>

<div
	class="flex flex-row w-full p-3 my-3 border-2 border-slate-400 rounded hover:bg-slate-200"
	data-testid="menu"
	role="listitem"
>
	<div class="flex flex-1 w-full">
		<MenuName bind:menu {editionMode} />
	</div>

	{#if editionMode}
		<button type="button" class="italic mx-2" on:click={dispatchDelete} data-testid="delete">
			Delete
		</button>
	{/if}
</div>
