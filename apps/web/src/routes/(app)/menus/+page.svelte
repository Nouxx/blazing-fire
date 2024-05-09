<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { ActionData } from './$types.js';
	import Menu from './components/Menu.svelte';

	// export let form: ActionData;
	export let data;
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<h1 class="text-3xl font-bold my-3 mb-8">Your Menus</h1>

	{#if data.menus.length === 0}
		<p class="mb-2">You don't have any menu yet.</p>
	{/if}

	{#if data.menus.length > 0}
		{#each data.menus as menu}
			<Menu {menu}/>
		{/each}
	{/if}

	<form method="POST" action="?/createMenu">
		<Button label="New menu" id="new-menu" />
	</form>
</div>
