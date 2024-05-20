<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Menu } from '$lib/types/menu';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../$types';

	export let isHovered: boolean;
	export let menu: Menu;
	export let form: ActionData;

	const ENABLE_RENAME_EVENT = 'renameEnabled';

	let renameEnabled = false;

	let initialMenuName = menu.name;
	let isMenuNameNew = menu.name !== initialMenuName;

	$: {
		isMenuNameNew = menu.name !== initialMenuName;
	}

	const dispatch = createEventDispatcher();

	function enableRename() {
		dispatch(ENABLE_RENAME_EVENT, true);
	}

	function disableRename() {
		dispatch(ENABLE_RENAME_EVENT, false);
	}

	function cancelEdition(): void {
		renameEnabled = false;
		disableRename();
		form = null;
		menu.name = initialMenuName;
	}
</script>

<form
	method="post"
	action="?/renameMenu"
	class="flex flex-row"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				renameEnabled = false;
				disableRename();
			}
			update();
		};
	}}
>
	{#if isHovered && !renameEnabled}
		<button
			class="italic"
			on:click={() => {
				renameEnabled = true;
				enableRename();
			}}>Rename</button
		>
	{/if}
	{#if renameEnabled}
		{#if form?.error}
			<p class="text-red-400 mx-2">Whoops! Error...</p>
		{/if}
		<button
			type="submit"
			class="mx-2 italic"
			disabled={!isMenuNameNew}
			class:text-slate-500={!isMenuNameNew}
		>
			{form?.error ? 'Retry ' : 'Save'}
		</button>
		<button type="button" class="mx-2 italic" on:click={cancelEdition}> Cancel </button>
	{/if}
	<input type="hidden" name="name" value={menu.name} />
	<input type="hidden" name="id" value={menu.id} />
</form>
