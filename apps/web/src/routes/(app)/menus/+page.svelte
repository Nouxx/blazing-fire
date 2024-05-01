<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';

	export let data;
	const menus = data.menus;
</script>

<div class="flex flex-col items-center mx-5" data-testid="menu-page">
	<h1 class="text-3xl font-bold my-3 mb-8">Your Menus</h1>
	{#if menus}
		{#each menus as menu}
			<Menu {menu} />
		{/each}
	{/if}
</div>
