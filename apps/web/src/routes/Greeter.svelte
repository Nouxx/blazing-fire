<script lang="ts">
	import { userStore } from '../stores/user-store';
</script>

<span class="text-l my-2">
	Hello,
	{#if $userStore.information && $userStore.isLoggedIn}
		{$userStore.information.name}.
	{:else}
		you.
	{/if}
</span>
