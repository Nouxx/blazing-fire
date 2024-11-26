<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { setContext } from 'svelte';
	import MenuCreateAction from './components/MenuCreateAction.svelte';
	import MenuTile from './components/MenuTile.svelte';

	export let data;
	export let form;

	setContext('form', form);

	let isEditionOn = true; // todo: move to a store
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

<div class="menu-page">
	<div class="menu-page__content">
		<div class="menu-page__header">
			<h1 class="menu-page__title">My Menus</h1>
		</div>

		<div class="menu-page__actions">
			{#if !isEditionOn}
				<MenuCreateAction />
			{/if}
			<Button
				variant="secondary"
				label={isEditionOn ? 'Back' : 'Edit'}
				dataTestId="toggle-edit"
				on:click={() => toggleEditionMode()}
			/>
		</div>

		<div class="menu-page__menus">
			{#if thereIsNoMenu}
				<p class="my-4">You don't have any menu yet.</p>
			{:else}
				{#each data.menus as menu (menu.id)}
					<MenuTile {menu} editionMode={isEditionOn} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.menu-page {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		height: 100%;

		padding-left: 5rem;
		padding-right: 5rem;
		padding-top: 3rem;

		&__content {
			display: flex;
			flex-direction: column;
			flex-grow: 1;

			width: 100%;

			background-color: var(--color-background-secondary);

			border-top-left-radius: 2rem;
			border-top-right-radius: 2rem;
		}

		&__header {
			display: flex;
			flex-direction: row;
			flex: 0 1 auto;
			align-items: center;

			width: 100%;

			padding: 1rem 1.5rem;
		}

		&__title {
			display: flex;
			flex: 1 1 auto;

			font-size: 1.875rem;
			line-height: 2.25rem;
			font-weight: 700;
		}

		&__actions {
			display: flex;
			flex-direction: row;
			justify-content: end;
			gap: 0.5rem;

			padding: 1rem 1.5rem;
		}

		&__menus {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;

			padding: 1rem 1.5rem;
		}
	}
</style>
