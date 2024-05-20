<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Menu } from '$lib/types/menu';
	import type { ActionData } from '../$types';

	export let menu: Menu;
	export let form: ActionData; // todo: understand about action data form type
	export let isHovered: boolean;

    // todo: set focus on the input when editing?
    // todo: disable browser reco
	let menuName = menu.name;
	let nameLength = menuName.length;
	let initialMenuName = menu.name;
	let editionMode = false;
	let isMenuNameNew = menuName !== initialMenuName;

	$: {
		isMenuNameNew = menuName !== initialMenuName;
		console.log('isMenuNameNew = ', isMenuNameNew);
		nameLength = menuName.length;
	}

	function cancelEdition(): void {
		editionMode = false;
		form = null;
		menuName = initialMenuName;
	}
</script>

<form
	method="post"
	action="?/renameMenu"
	use:enhance={() => {
		return async ({ result, update }) => {
			console.log('result.type', result.type);
			if (result.type === 'success') {
				editionMode = false;
			}
			update();
		};
	}}
>
	<div class="flex flex-row">
		{#if editionMode}
			<input
				type="text"
				name="name"
				bind:value={menuName}
				class="flex text-center outline-none"
				class:underline={editionMode}
				class:underline-offset-4={editionMode}
				class:font-bold={editionMode}
				style="width: {nameLength + 1}ch;"
				data-testid="name-input"
			/>
		{:else}
			<p
				class:underline={editionMode}
				class:underline-offset-4={editionMode}
				class:font-bold={editionMode}
			>
				{menuName}
			</p>
		{/if}

		{#if isHovered && !editionMode}
			<button
				type="button"
				class="mx-2 italic text-slate-500"
				on:click={() => {
					editionMode = true;
				}}
			>
				Rename
			</button>
		{/if}

		{#if editionMode}
			{#if form?.error}
				<div class="text-red-400 mx-2">Whoops! Error...</div>
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

		<input type="hidden" name="id" value={menu.id} />
	</div>
</form>
