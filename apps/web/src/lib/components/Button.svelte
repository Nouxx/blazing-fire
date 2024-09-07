<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const CLICK_EVENT = 'click';

	type TagType = 'button' | 'a';
	export let tag: TagType = 'button';

	type ButtonType = 'button' | 'submit' | 'reset';
	const DEFAULT_TYPE = 'button';
	export let type: ButtonType = DEFAULT_TYPE;

	type ButtonVariant = 'primary' | 'secondary' | 'tertiary'; // todo: refactor
	export let variant: ButtonVariant;

	export let label: string;
	export let href: string;
	export let id: string;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(CLICK_EVENT);
	}
	// class="p-1 px-3 border-2 text-center h-9 shadow-md rounded"
</script>

<svelte:element
	this={tag}
	class="button button__{variant}"
	{type}
	on:click={handleClick}
	data-testid={id}
	{href}
	{disabled}
>
	{label}
</svelte:element>

<style lang="scss">
	.button {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;

		width: fit-content;
		text-align: center;

		border-radius: 0.375rem;

		&__primary {
			background: var(--button-color-background-primary);
			color: var(--button-content-color-primary);

			&:hover {
				background: var(--button-color-background-primary-hover);
				color: var(--button-content-color-primary-hover);
			}
		}
	}
</style>
