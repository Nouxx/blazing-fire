<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import MenuName from './MenuName.svelte';

	import type { Menu } from '$lib/types/menu';

	const DELETE_EVENT = 'delete';

	export let menu: Menu;
	export let index: number;
	export let editionMode: boolean;

	let formElement: HTMLFormElement;
	let saveSuccessfull: boolean | null = null;

	let isSaving = false;

	let nameInDB = menu.name; // todo: rename
	let isNameDifferentFromDB = false;

	const dispatch = createEventDispatcher();

	function dispatchDelete() {
		dispatch(DELETE_EVENT, menu);
	}

	function setSaveSuccess() {
		saveSuccessfull = true;
		nameInDB = menu.name;
		// update saveStore
		isSaving = false;
	}

	function setSaveFailed() {
		saveSuccessfull = false;
		// update store
		isSaving = false;
	}

	$: {
		isNameDifferentFromDB = menu.name !== nameInDB;
		// update store
	}

	export async function saveMenu() {
		// console.log(`Menu #${index} notified!`);
		isSaving = true;
		formElement.requestSubmit();
	}
</script>

<div
	class="flex flex-row w-full p-3 my-3 border-2 border-slate-400 rounded hover:bg-slate-200"
	data-testid="menu"
>
	<div class="flex flex-1 w-full">
		<MenuName bind:menu {editionMode} />
	</div>

	{#if editionMode}
		<div class="flex flex-col justify-center italic text-xs">
			{#if isSaving}
				<p>Loading...</p>
			{/if}

			{#if saveSuccessfull === true}
				<p>Saved</p>
			{/if}

			{#if saveSuccessfull === false}
				<p class="text-red-600">Whoops</p>
			{/if}
		</div>

		<button type="button" class="italic mx-2" on:click={dispatchDelete} data-testid="delete">
			Delete
		</button>
	{/if}
</div>

<form
	bind:this={formElement}
	action="?/renameMenu"
	method="post"
	use:enhance={() => {
		return async ({ result, update }) => {
			// todo: use function above
			if (result.type === 'success') {
				saveSuccessfull = true;
				nameInDB = menu.name;
			} else {
				saveSuccessfull = false;
			}
			isSaving = false;
			update();
		};
	}}
>
	<input type="hidden" name="id" value={menu.id} />
	<input type="hidden" name="name" value={menu.name} />
</form>
