<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';

	export let data;
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<h1 class="text-3xl font-bold my-3 mb-8">Your Menus</h1>
	{#if data.menus.length > 0}
		{#each data.menus as menu}
			<Menu {menu} />
		{/each}
		<form method="POST" action="?/createMenu">
			<button
				class="p-1 my-3 px-3 border-2 text-center border-slate-200 shadow-md rounded"
				data-testid="new-menu">Create a menu</button
			>
		</form>
	{:else}
		<p class="mb-2">You don't have any menu yet.</p>
		<form method="POST" action="?/createMenu">
			<button
				class="p-1 my-3 px-3 border-2 text-center border-slate-200 shadow-md rounded"
				data-testid="new-menu">Create a new one</button
			>
		</form>
	{/if}
</div>
