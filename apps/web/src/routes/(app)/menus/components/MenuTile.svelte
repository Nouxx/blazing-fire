<script lang="ts">
	import { enhance } from '$app/forms';
	import MenuName from './MenuName.svelte';

	import type { Menu } from '$lib/types/menu';
	import Button from '$lib/components/Button.svelte';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';
	import MenuDeleteAction from './MenuDeleteAction.svelte';

	export let menu: Menu;
	export let editionMode: boolean;

	// todo: refactor
	// todo: disable toggle edit when saving

	let formElement: HTMLFormElement;

	let isSubmitted: boolean;
	let saveSuccessful: boolean;
	let isSaving: boolean;

	let nameInDB = menu.name; // todo: rename
	let isNameDifferentFromDB: boolean;

	function initState(caller: any) {
		console.log('initState called by ' + caller);
		isSubmitted = false;
		saveSuccessful = false;
		isSaving = false;
		menu.name = nameInDB;
		isNameDifferentFromDB = false;
	}

	initState('script');

	function setIsSaving(value: boolean) {
		isSaving = value;
	}

	function setSaveSuccess() {
		saveSuccessful = true;
		nameInDB = menu.name;
		isSubmitted = true;
		isSaving = false;
	}

	function setSaveFailed() {
		saveSuccessful = false;
		isSubmitted = true;
		isSaving = false;
	}

	function onChange(...args) {
		initState(args);
	}

	$: isNameDifferentFromDB = menu.name !== nameInDB;

	$: onChange(editionMode);

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
		<MenuActionsFeedback status={saveSuccessful} display={isSubmitted} />
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
