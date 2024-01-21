<script lang="ts">
	import type { HeaderLink } from '$lib/types/header-link';
	import { userStore } from '../stores/user-store';

	export let linkOverride: HeaderLink | undefined = undefined;
</script>

<div class="flex flex-col sticky top-0">
	<div class="flex flex-row items-center bg-slate-50 py-3 border-b-4 border-slate-400">
		<div class="px-2 flex-1">
			<div>
				<p class="font-bold">LOGO</p>
			</div>
		</div>

		<div class="flex flex-col content-center px-2 hover:text-sky-500 cursor-pointer">
			{#if linkOverride}
				<a href={linkOverride.url}>{linkOverride.label}</a>
			{:else}
				<a href="/account">My Account</a>
			{/if}
		</div>
	</div>
</div>
<div />

<!-- {#if $userStore.isLoading}
	<div class="w-28 flex space-x-4 animate-pulse items-center pl-1">
		<div class="flex-1 space-y-6">
			<div class="h-2 bg-slate-300 rounded" />
		</div>
	</div>
{:else if $userStore.isLoggedIn}
	<button class="inline underline text-blue-500">My Account</button>
{:else}
	<div>
		To use the app, you must
		<button class="inline underline text-blue-500">login</button>
		first.
	</div>
{/if} -->
