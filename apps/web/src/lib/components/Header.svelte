<script lang="ts">
	import type { HeaderLink } from '$lib/types/header-link';
	import type { Session } from '@supabase/supabase-js';

	export let linkOverride: HeaderLink | undefined = undefined;

	export let session: Session | null = null;
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
				<a href={linkOverride.url} data-testid="header-link">{linkOverride.label}</a>
			{:else if session}
				<a href="/account" data-testid="header-link">My Account</a>
			{:else}
				<a href="/auth/signin" data-testid="header-link">Sign in</a>
			{/if}
		</div>
	</div>
</div>
<div />
