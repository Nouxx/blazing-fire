<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { menuPageStore } from '../stores/menu-store';
	import type { Menu } from '$lib/types/menu';
	import type { ActionData } from '../$types';
	import type { TextInputState } from '$lib/components/types/input';

	export let menu: Menu;

	let initialMenu = structuredClone(menu);
	let state: TextInputState;
	let isEditionEnabled: boolean;
	let formElement: HTMLFormElement;

	const unsubscribeFromPageStore = menuPageStore.subscribe((store) => {
		isEditionEnabled = store.isEditionEnabled;
	});

	const unsubscribeFromFormStore = page.subscribe(({ form }: { form: ActionData }) => {
		if (form?.data?.id === menu.id) {
			state = form.success ? 'success' : 'error';
			if (!form.success) {
				menu.name = form.data.name;
			}
		}
	});

	onDestroy(() => {
		unsubscribeFromFormStore();
		unsubscribeFromPageStore();
	});

	function submitForm() {
		console.log('submitForm', menu.name != initialMenu.name, menu.name, initialMenu.name);
		if (menu.name != initialMenu.name) {
			formElement.requestSubmit();
			state = 'loading';
		}
	}
</script>

<div class="menu__name">
	{#if isEditionEnabled}
		<form bind:this={formElement} action="?/renameMenu" method="post">
			<input type="hidden" name="id" value={menu.id} />
			<TextInput
				name="name"
				bind:value={menu.name}
				{state}
				on:focusOut={submitForm}
				charactersLimit={40}
				disabled={false}
			/>
		</form>
	{:else}
		<p class="menu__name menu__name--read-only">
			{menu.name}
		</p>
	{/if}
</div>

<style lang="scss">
	.menu {
		&__name {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0rem;
			width: 100%;

			height: 2rem;

			&--read-only {
				font-size: 1.15rem;
				line-height: 2.25rem;
				font-weight: 700;
			}
		}
	}
</style>
