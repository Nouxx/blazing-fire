<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import MenuActionsFeedback from './MenuActionsFeedback.svelte';

	import type { SubmitFunction } from '../$types';

	let isLoading = false;
	let isSubmitted = false; // todo: use form store instead
	let isSubmissionOk = false;

	const submitFunction: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			isSubmissionOk = result.type === 'success';
			isLoading = false;
			isSubmitted = true;
			update();
		};
	};
</script>

<form action="?/createMenu" method="POST" use:enhance={submitFunction}>
	<Button
		variant="primary"
		type="submit"
		label="Create a new menu"
		dataTestId="new-menu"
		disabled={isLoading}
		shadow
	/>
</form>

<div class="mt-2">
	<MenuActionsFeedback display={isSubmitted && !isSubmissionOk} status={false} />
</div>
