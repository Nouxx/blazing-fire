<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { ActionData } from './$types.js';
	import MenuTile from './components/MenuTile.svelte';

	export let form: ActionData; // todo: understand about action data form type
	export let data;

	let editionMode = false;

	function toggleEditionMode(value?: boolean): void {
		if (value !== undefined) {
			editionMode = value;
			return;
		}
		editionMode = !editionMode;
	}

	$: {
		if (data.menus.length === 0) {
			toggleEditionMode(false);
		}
	}

	// keep 4 later
	// const submitFunction: SubmitFunction = () => {
	// 	return async ({ result }) => {
	// 		if (result.type === 'success' && result.data?.id) {
	// 			result.data; // typed
	// 		}
	// 	};
	// };
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<div class="flex flex-row w-full my-6 items-center">
		<h1 class="flex flex-1 text-3xl font-bold">Menus</h1>
		<div>
			{#if editionMode}
				<Button label="Back" id="toggle-edit" on:click={() => toggleEditionMode(false)} />
			{:else}
				<Button label="Edit" id="toggle-edit" on:click={() => toggleEditionMode(true)} />
			{/if}
		</div>
	</div>

	{#if data.menus.length === 0}
		<p class="mb-2">You don't have any menu yet.</p>
	{/if}

	{#if data.menus.length > 0}
		{#each data.menus as menu (menu.id)}
			<MenuTile {menu} {editionMode} />
		{/each}
	{/if}

	<!-- todo: CreateMenuAction.svelte -->
	{#if !editionMode}
		<form
			method="POST"
			action="?/createMenu"
			use:enhance={() => {
				return async ({ update }) => {
					// todo: handle error
					// todo: handle loading
					update();
				};
			}}
		>
			<Button type="submit" label="+ Menu" id="new-menu" />
		</form>
	{/if}
</div>
