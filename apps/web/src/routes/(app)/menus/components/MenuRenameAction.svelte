<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	import type { Menu } from '$lib/types/menu';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let menu: Menu;
	export let disabled: boolean;

	let isLoading: boolean;

	const SAVE_SUCCESS_EVENT = 'success';
	const SAVE_ERROR_EVENT = 'error';
	const SAVE_EVENT = 'save';

	const dispatch = createEventDispatcher<{
		[SAVE_SUCCESS_EVENT]: Menu;
		[SAVE_ERROR_EVENT]: null;
		[SAVE_EVENT]: null;
	}>();

	function setSaveSuccess() {
		dispatch(SAVE_SUCCESS_EVENT, menu);
		isLoading = false;
	}

	function setSaveFailed() {
		dispatch(SAVE_ERROR_EVENT);
		isLoading = false;
	}

	const submitFunction: SubmitFunction = () => {
		isLoading = true;
		dispatch(SAVE_EVENT);
		return async ({ result, update }) => {
			if (result.type === 'success') {
				setSaveSuccess();
			} else {
				setSaveFailed();
			}
			update();
		};
	};
</script>

<form action="?/renameMenu" method="post" use:enhance={submitFunction}>
	<input type="hidden" name="id" value={menu.id} />
	<input type="hidden" name="name" value={menu.name} />
	<Button
		label={isLoading ? 'Loading...' : 'Save'}
		dataTestId="save"
		type="submit"
		disabled={disabled || isLoading}
	/>
</form>
