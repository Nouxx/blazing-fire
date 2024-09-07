<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuCreateAction from './components/MenuCreateAction.svelte';
	import MenuTile from './components/MenuTile.svelte';

	export let data;

	let isEditionOn = false;
	$: thereIsNoMenu = data.menus.length === 0;

	function toggleEditionMode(value?: boolean): void {
		if (value !== undefined) {
			isEditionOn = value;
			return;
		}
		isEditionOn = !isEditionOn;
	}

	$: {
		if (thereIsNoMenu) {
			toggleEditionMode(false);
		}
	}
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<div class="flex flex-row w-full my-6 items-center">
		<h1 class="flex flex-1 text-3xl font-bold">Menus</h1>
		<Button
			label={isEditionOn ? 'Back' : 'Edit'}
			dataTestId="toggle-edit"
			on:click={() => toggleEditionMode()}
		/>
	</div>

	{#if thereIsNoMenu}
		<p class="mb-2">You don't have any menu yet.</p>
	{:else}
		{#each data.menus as menu (menu.id)}
			<MenuTile {menu} editionMode={isEditionOn} />
		{/each}
	{/if}

	{#if !isEditionOn}
		<MenuCreateAction />
	{/if}
</div>
