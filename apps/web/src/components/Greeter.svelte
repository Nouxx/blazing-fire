<script lang="ts">
	import { userStore } from '../stores/user-store';
</script>

<span class="text-l my-2">
	<span>Hello,</span>
	{#if $userStore.information?.name}
		<span>{$userStore.information.name}.</span>
	{:else}
		<span>you</span>.
	{/if}
</span>
