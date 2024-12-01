<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import type { Menu } from '$lib/types/menu';
	import { getContext } from 'svelte';
	import type { ActionData } from '../$types';
	import type { TextInputState } from '$lib/components/types/input';

	export let menu: Menu;
	export let editionMode: boolean;

	let isSaving = false;
	let storedName = menu.name;

	let form = getContext<ActionData>('form'); // use page store

	let formElement: HTMLFormElement;

	function submitForm() {
		if (menu.name != storedName) {
			formElement.requestSubmit();
			isSaving = true;
		}
	}

	// todo: refactor ActionData
	console.log('form', form);
	const hasFormResponseForTheComponent = form && form.data?.id == menu.id;
	const isFormSuccess = hasFormResponseForTheComponent && form.success;
	const isFormError = hasFormResponseForTheComponent && form.error;

	console.log('hasFormResponseForTheComponent', hasFormResponseForTheComponent);

	// todo: handle errors

	let state: TextInputState;

	if (isFormSuccess) {
		state = 'success';
	}
	if (isFormError) {
		menu.name = form.data?.name;
		state = 'error';
	}
	$: {
		if (isSaving) {
			state = 'loading';
		}
	}
</script>

<div class="element">
	{#if editionMode}
		<form bind:this={formElement} action="?/renameMenu" method="post">
			<input type="hidden" name="id" value={menu.id} />
			<TextInput
				name="name"
				bind:value={menu.name}
				disabled={false}
				on:focusOut={submitForm}
				{state}
				charactersLimit={20}
			/>
		</form>
		<!-- {#if isSaving}
			<div class="element__status--loading">
				<LoadingSpinner variant="primary" />
			</div>
		{/if} -->
		<!-- {#if showSuccess}
			<div class="element__status--success" transition:fade>
				<Icon variant="primary">
					<CheckIcon />
				</Icon>
			</div>
		{/if} -->
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
