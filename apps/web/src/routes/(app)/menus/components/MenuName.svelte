<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import type { Menu } from '$lib/types/menu';

	const NAME_CHARACTERS_LIMIT = 40;

	export let menu: Menu;
	export let editionMode: boolean;

	$: {
		if (menu.name.length > NAME_CHARACTERS_LIMIT) {
			menu.name = menu.name.slice(0, menu.name.length - 1);
		}
	}
</script>

<div class="element">
	{#if editionMode}
		<!-- <input
			type="text"
			name="name"
			bind:value={menu.name}
			class="outline-none bg-inherit"
			class:underline={editionMode}
			class:underline-offset-4={editionMode}
			data-testid="name-input"
			autocomplete="off"
		/> -->
		<TextInput bind:value={menu.name} disabled={false} />
		<!-- <p class="text-xs text-slate-500">{menu.name.length}/{NAME_CHARACTERS_LIMIT}</p> -->
	{:else}
		<p class="element--read-only">
			{menu.name}
		</p>
	{/if}
</div>

<style lang="scss">
	.element {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;

		height: 2rem;

		&--read-only {
			font-size: 1.15rem;
			line-height: 2.25rem;
			font-weight: 700;
		}
	}
</style>
