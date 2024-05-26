<script lang="ts">
	export let display = false;
	export let status: boolean;
</script>

{#if display}
	<div class="flex flex-col justify-center italic text-s mx-2">
		{#if status}
			<p class="text-green-600">All good!</p>
		{:else}
			<p class="text-red-600">Whoops..</p>
		{/if}
	</div>
{/if}
