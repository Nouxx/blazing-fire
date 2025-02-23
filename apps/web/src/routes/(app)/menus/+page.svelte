<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onDestroy } from 'svelte';
	import MenuCreateAction from './components/MenuCreateAction.svelte';
	import MenuTile from './components/MenuTile.svelte';
	import { menuPageStore } from './stores/menu-store';

	export let data;
	export let form;

	let isEditionEnabled: boolean;

	if (form?.action === 'renameMenu' && form.success) {
		menuPageStore.setProperty('isEditionEnabled', true);
	}

	const unsubscribe = menuPageStore.subscribe((store) => {
		isEditionEnabled = store.isEditionEnabled;
	});

	function toggleEditionMode(value?: boolean): void {
		if (value !== undefined) {
			menuPageStore.setProperty('isEditionEnabled', value);
			return;
		}
		menuPageStore.setProperty('isEditionEnabled', !isEditionEnabled);
	}

	$: thereIsNoMenu = data.menus?.length === 0;

	$: {
		if (thereIsNoMenu) {
			toggleEditionMode(false);
		}
	}

	onDestroy(() => unsubscribe());
</script>

<div class="menu-page" data-testid="menu-page">
	<div class="menu-page__content">
		<div class="menu-page__header">
			<h1 class="menu-page__title">My Menus</h1>
		</div>

		<div class="menu-page__actions">
			{#if !isEditionEnabled}
				<MenuCreateAction />
			{/if}
			<Button
				variant="secondary"
				label={isEditionEnabled ? 'Back' : 'Edit'}
				dataTestId="toggle-edit"
				shadow
				on:click={() => toggleEditionMode()}
			/>
		</div>

		<div class="menu-page__menus">
			{#if thereIsNoMenu}
				<p class="my-4">You don't have any menu yet.</p>
			{:else}
				{#each data.menus as menu (menu.id)}
					<MenuTile {menu} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../style' as *;

	.menu-page {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		height: 100%;

		padding-left: $spacing-80;
		padding-right: $spacing-80;
		padding-top: $spacing-48;

		&__content {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: $spacing-36;

			width: 100%;

			padding-top: $spacing-36;
			padding-left: $spacing-36;
			padding-right: $spacing-36;

			background-color: var(--color-background-secondary);
			border: 1px solid var(--color-background-tertiary);
			border-top-left-radius: 2rem;
			border-top-right-radius: 2rem;
		}

		&__header {
			display: flex;
			flex-direction: row;
			flex: 0 1 auto;
			align-items: center;

			width: 100%;
		}

		&__title {
			display: flex;
			flex: 1 1 auto;

			@include font-heading;
		}

		&__actions {
			display: flex;
			flex-direction: row;
			justify-content: end;
			gap: $spacing-8;
		}

		&__menus {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: $spacing-32;
		}
	}
</style>
