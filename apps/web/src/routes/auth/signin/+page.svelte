<script lang="ts">
	import SignInForm from '$lib/pages/SignInForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<SignInForm {form} />
