<script lang="ts">
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import '../app.scss';
	import { modalStore } from '$lib/stores/modalStore';
</script>

<noscript>
	<div class="w-full bg-red-200 text-center py-1">
		<p class="text-sm">JavaScript is blocked by your browser, you might experience issues</p>
	</div>
</noscript>

{#if $modalStore}
	<ConfirmationModal modal={$modalStore} />
{/if}

<slot />

<style lang="scss">
	:global(body) {
		background: var(--color-background-primary);
	}
</style>
