<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import { apiRoutes } from '$lib/types/routes';

	export let menu: Menu;

	let isRenameModeEnabled = false;
	let initialMenuName: string;

	function enableRenameMode() {
		initialMenuName = menu.name;
		isRenameModeEnabled = true;
	}

	async function saveMenu() {
		if (menu.name === initialMenuName) {
			isRenameModeEnabled = false;
			return;
		}
		const body = {
			name: menu.name
		};
		const res = await fetch(`${apiRoutes.menus}/${menu.id}`, {
			method: 'PUT',
			body: JSON.stringify(body)
		});
		const updatedName = (await res.json()).name;
		menu.name = updatedName;
		isRenameModeEnabled = false;
	}
</script>

<!-- TO USE ENTHER AS A TRIGGER: move to a form -->
<!-- Hit enter in an input submit the form -->
<!-- button inside of a form must be typed with button to not trigger -->
<div class="flex flex-row w-full p-3 border-2 border-slate-400 rounded" data-testid="menu">
	<div class="flex flex-1">
		{#if isRenameModeEnabled}
			<input
				type="text"
				bind:value={menu.name}
				class="font-bold underline underline-offset-4"
				data-testid="name-input"
			/>
		{:else}
			<p data-testid="name">{menu.name}</p>
		{/if}
	</div>
	{#if isRenameModeEnabled}
		<button class="flex" on:click={saveMenu} data-testid="save"> Save </button>
	{:else}
		<button class="flex" on:click={enableRenameMode} data-testid="rename"> Rename </button>
	{/if}
</div>
