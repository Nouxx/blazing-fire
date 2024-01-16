<script lang="ts">
	import { onDestroy } from 'svelte';
	import { userStore } from '../stores/user-store';

	type HeaderLink = {
		label: string;
		url: string;
	};

	export let linkOverride: HeaderLink | undefined = undefined;

	let link: HeaderLink;

	if (linkOverride) {
		link = linkOverride;
	}

	const unsub = userStore.subscribe((user) => {
		console.log('user', user);
	});

	onDestroy(() => {
		unsub();
	});

	//todo: update the link according to the user signed in.
</script>

<div class="flex flex-col sticky top-0">
	<div class="flex flex-row items-center bg-slate-50 py-3 border-b-4 border-slate-400">
		<div class="px-2 flex-1">
			<div>
				<p class="font-bold">LOGO</p>
			</div>
		</div>

		<div class="flex flex-col content-center px-2 hover:text-sky-500 cursor-pointer">
			<a href={link.url}>{link.label}</a>
		</div>
	</div>
</div>
<div>
	{#if $userStore.isLoading}
		<div class="h-2 w-14 animate-pulse bg-slate-300 rounded" />
	{:else if $userStore.isLoggedIn}
		<a href="/account">My Account</a>
	{:else}
		<a href="/signin">Sign In</a>
	{/if}
</div>

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
