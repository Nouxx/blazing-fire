<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuCreateAction from './components/MenuCreateAction.svelte';
	import MenuTile from './components/MenuTile.svelte';

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
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<div class="flex flex-row w-full my-6 items-center">
		<h1 class="flex flex-1 text-3xl font-bold">Menus</h1>
		<Button
			label={editionMode ? 'Back' : 'Edit'}
			id="toggle-edit"
			on:click={() => toggleEditionMode()}
		/>
	</div>

	{#if data.menus.length === 0}
		<p class="mb-2">You don't have any menu yet.</p>
	{/if}

	{#if data.menus.length > 0}
		{#each data.menus as menu (menu.id)}
			<MenuTile {menu} {editionMode} />
		{/each}
	{/if}

	{#if !editionMode}
		<MenuCreateAction />
	{/if}
</div>
