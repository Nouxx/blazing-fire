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

<div class="page" data-testid="menu-page">
	<div class="page__header">
		<h1 class="page__header-title">Menus</h1>
		<Button
			variant="primary"
			label={isEditionOn ? 'Back' : 'Edit'}
			dataTestId="toggle-edit"
			on:click={() => toggleEditionMode()}
		/>
	</div>

	<div class="page__main">
		<p>YOLO</p>
	</div>

	<!-- {#if thereIsNoMenu}
		<p class="my-4">You don't have any menu yet.</p>
	{:else}
		{#each data.menus as menu (menu.id)}
			<MenuTile {menu} editionMode={isEditionOn} />
		{/each}
	{/if}

	{#if !isEditionOn}
		<MenuCreateAction />
	{/if} -->
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 1.25rem;
		padding-right: 1.25rem;
		width: 100%;
		height: 100vh;

		&__header {
			display: flex;
			flex-direction: row;
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
			align-items: center;
			width: 100%;

			&-title {
				display: flex;
				flex: 1;
				font-size: 1.875rem;
				line-height: 2.25rem;
				font-weight: 700;
			}
		}

		&__main {
			width: 100%;
			margin-top: 1.5rem;
			border-top-left-radius: 2rem;
			border-top-right-radius: 2rem;
			background-color: var(--color-background-secondary);
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}

	.debug {
		border: 1px solid violet;
	}
</style>
