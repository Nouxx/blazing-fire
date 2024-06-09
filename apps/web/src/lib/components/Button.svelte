<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const CLICK_EVENT = 'click';

	type ButtonType = 'button' | 'submit' | 'reset';
	const DEFAULT_TYPE = 'button';

	type ButtonStyle = 'light' | 'danger';
	const DEFAULT_STYLE = 'light';

	export let label: string;
	export let id: string;
	export let disabled = false;
	export let type: ButtonType = DEFAULT_TYPE;
	export let style: ButtonStyle = DEFAULT_STYLE;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch(CLICK_EVENT);
	}
</script>

<button
	{type}
	on:click={handleClick}
	class="p-1 px-3 border-2 text-center h-9 shadow-md rounded"
	class:border-slate-200={style === 'light'}
	class:disabled:text-slate-200={style === 'light'}
	class:disabled:text-red-400={style === 'danger'}
	class:border-red-800={style === 'danger'}
	class:bg-red-500={style === 'danger'}
	class:text-white={style === 'danger'}
	data-testid={id}
	{disabled}
>
	{label}
</button>
