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
	<div class="page__content">
		<div class="content__header">
			<h1 class="content__header-title">My Menus</h1>
			<Button
				variant="primary"
				label={isEditionOn ? 'Back' : 'Edit'}
				dataTestId="toggle-edit"
				on:click={() => toggleEditionMode()}
			/>
		</div>
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
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 2rem;
		width: 100%;
		height: 100%;

		&__content {
			width: 100%;
			border-top-left-radius: 2rem;
			border-top-right-radius: 2rem;
			background-color: var(--color-background-secondary);
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}
	}

	.content {
		&__header {
			display: flex;
			flex-direction: row;
			flex: 0 1 auto;
			padding: 1.5rem;
			align-items: center;
			width: 100%;

			&-title {
				display: flex;
				flex: 1 1 auto;
				font-size: 1.875rem;
				line-height: 2.25rem;
				font-weight: 700;
			}
		}
	}

	.debug {
		border: 1px solid violet;
	}
</style>
