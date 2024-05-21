<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const CLICK_EVENT = 'click';
	type ButtonType = 'button' | 'submit' | 'reset';
	const DEFAULT_TYPE = 'button';

	export let label: string;
	export let id: string;
	export let disabled = false;
	export let type: ButtonType = DEFAULT_TYPE;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(CLICK_EVENT);
	}
</script>

<button
	{type}
	on:click={handleClick}
	class="p-1 m-3 px-3 border-2 text-center border-slate-200 shadow-md rounded disabled:text-slate-200"
	data-testid={id}
	{disabled}
>
	{label}
</button>
