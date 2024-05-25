<script lang="ts">
	export let status: boolean | null;

	export let ignoreSuccess = false;
</script>

{#if status !== null}
	<div class="flex flex-col justify-center italic text-s mx-2">
		{#if status}
			{#if !ignoreSuccess}
				<p class="text-green-600">All good!</p>
			{/if}
		{:else}
			<p class="text-red-600">Whoops..</p>
		{/if}
	</div>
{/if}
