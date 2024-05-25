<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '../$types';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';

	let formElement: HTMLFormElement;
	let isLoading: boolean;
	let actionStatus: boolean | null = null;

	function submitForm() {
		isLoading = true;
		formElement.submitForm();
	}

	const submitFunction: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				actionStatus = true;
			} else {
				actionStatus = false;
			}
			isLoading = false;
			update();
		};
	};
</script>

<form bind:this={formElement} method="POST" action="?/createMenu" use:enhance={submitFunction}>
	<Button type="submit" label="+ Menu" id="new-menu" on:click={submitForm} />
	<MenuActionsFeedback status={actionStatus} ignoreSuccess={true} />
</form>
