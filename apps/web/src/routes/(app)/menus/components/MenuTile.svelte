<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import MenuName from './MenuName.svelte';

	import type { Menu } from '$lib/types/menu';
	import Button from '$lib/components/Button.svelte';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';

	export let menu: Menu;
	export let editionMode: boolean;

	let formElement: HTMLFormElement;
	let saveSuccessful: boolean | null = null;

	let isSaving = false;

	let nameInDB = menu.name; // todo: rename
	let isNameDifferentFromDB = false;

	function setIsSaving(value: boolean) {
		isSaving = value;
	}

	function setSaveSuccess() {
		saveSuccessful = true;
		nameInDB = menu.name;
		isSaving = false;
	}

	function setSaveFailed() {
		saveSuccessful = false;
		isSaving = false;
	}

	$: {
		isNameDifferentFromDB = menu.name !== nameInDB;
	}

	$: {
		if (editionMode === true) {
			saveSuccessful = null;
		}
	}

	export function saveMenu() {
		setIsSaving(true);
		formElement.requestSubmit();
	}
</script>

<div
	class="flex flex-row w-full p-3 my-3 h-16 border-2 border-slate-400 rounded hover:bg-slate-100"
	data-testid="menu"
>
	<div class="flex flex-1 w-full">
		<MenuName bind:menu {editionMode} />
	</div>

	{#if editionMode}
		<MenuActionsFeedback status={saveSuccessful} />
		<div data-testid="actions" class="[&>*]:ml-2">
			<Button
				label={isSaving ? 'Loading...' : 'Save'}
				id="save"
				on:click={saveMenu}
				disabled={!isNameDifferentFromDB || isSaving}
			/>
			<MenuDeleteAction {menu} disabled={isSaving} />
		</div>
	{/if}
</div>

<form
	bind:this={formElement}
	action="?/renameMenu"
	method="post"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				setSaveSuccess();
			} else {
				setSaveFailed();
			}
			update();
		};
	}}
>
	<input type="hidden" name="id" value={menu.id} />
	<input type="hidden" name="name" value={menu.name} />
</form>
