<script lang="ts">
	import { userStore } from '../stores/user-store';
</script>

<div class="text-l my-3 flex">
	<span>Hello,</span>&nbsp;
	{#if $userStore.isLoading}
		<div class="w-16 flex space-x-4 animate-pulse items-center pl-1">
			<div class="flex-1 space-y-6">
				<div class="h-2 bg-slate-300 rounded" />
			</div>
		</div>
	{:else if $userStore.isLoggedIn && $userStore.information}
		<span>{$userStore.information.name}.</span>
	{:else}
		<span>you.</span>
	{/if}
</div>
