<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';
	import LoadingSpinner from '$lib/components/atoms/LoadingSpinner.svelte';
	import CheckIcon from '$lib/components/icons/CheckIcon.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { Menu } from '$lib/types/menu';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const NAME_CHARACTERS_LIMIT = 40;

	export let menu: Menu;
	export let editionMode: boolean;

	let isSaving = false;

	$: {
		if (menu.name.length > NAME_CHARACTERS_LIMIT) {
			menu.name = menu.name.slice(0, menu.name.length - 1);
		}
	}

	let form = getContext('form');

	let formElement: HTMLFormElement;

	function submitForm() {
		formElement.requestSubmit();
		isSaving = true;
	}

	const hasFormResponse = form?.success && form.data.id === menu.id;
	let showSuccess = hasFormResponse;

	setTimeout(() => (showSuccess = false), 1000);

	// https://github.com/sveltejs/kit/issues/10796
</script>

<div class="element">
	{#if editionMode}
		<form bind:this={formElement} action="?/renameMenu" method="post">
			<input type="hidden" name="id" value={menu.id} />
			<TextInput name="name" bind:value={menu.name} disabled={false} on:focusOut={submitForm} />
		</form>
		{#if isSaving}
			<div class="element__status--loading">
				<LoadingSpinner variant="primary" />
			</div>
		{/if}
		{#if showSuccess}
			<div class="element__status--success" transition:fade>
				<Icon variant="primary">
					<CheckIcon />
				</Icon>
			</div>
		{/if}
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
		flex-direction: row;
		align-items: center;
		gap: 0rem;
		width: 100%;

		height: 2rem;

		&__status {
			&--success {
				height: 1.5rem;
				// visibility: hidden;
				// opacity: 0;
				// transition:
				// 	visibility 0s 2s,
				// 	opacity 2s linear;
			}
			&--loading {
				height: 1.5rem;
			}
		}

		&--read-only {
			font-size: 1.15rem;
			line-height: 2.25rem;
			font-weight: 700;
		}
	}
</style>
