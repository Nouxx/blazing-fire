<script lang="ts">
	import TextInput from '$lib/components/FormInput.svelte';
	import { onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { menuPageStore } from '../stores/menu-store';
	import type { Menu } from '$lib/types/menu';
	import type { SubmitFunction } from '../$types';

	export let menu: Menu;

	let initialMenu: Menu;
	let isEditionEnabled: boolean;
	let formElement: HTMLFormElement;
	let textInputElement: TextInput;

	const unsubscribeFromPageStore = menuPageStore.subscribe((store) => {
		isEditionEnabled = store.isEditionEnabled;
	});

	function submitForm() {
		formElement.requestSubmit();
	}

	function setInitialMenu() {
		initialMenu = structuredClone(menu);
	}

	setInitialMenu();

	onDestroy(() => {
		unsubscribeFromPageStore();
	});

	const submitFunction: SubmitFunction = ({ formData, cancel }) => {
		textInputElement.setState('loading');

		const nameToSubmit = formData.get('name');
		if (nameToSubmit === initialMenu.name) {
			cancel();
			textInputElement.setState(undefined);
		}

		return async ({ result }) => {
			if (result.type === 'success') {
				textInputElement.setState('success');
				setInitialMenu();
			} else {
				textInputElement.setState('error');
			}
		};
	};
</script>

<div class="menu__name">
	{#if isEditionEnabled}
		<form bind:this={formElement} action="?/renameMenu" method="post" use:enhance={submitFunction}>
			<input type="hidden" name="id" value={menu.id} />
			<TextInput
				name="name"
				bind:value={menu.name}
				bind:this={textInputElement}
				on:focusOut={submitForm}
				charactersLimit={40}
				disabled={false}
				dataTestId="name-input"
			/>
		</form>
	{:else}
		<p class="menu__name menu__name--read-only">
			{menu.name}
		</p>
	{/if}
</div>

<style lang="scss">
	@use '../../../../style' as *;

	.menu {
		&__name {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0rem;
			width: 100%;

			&--read-only {
				@include font-sub-heading;
			}

			form {
				width: 100%;
			}
		}
	}
</style>
