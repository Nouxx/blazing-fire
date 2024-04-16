<script lang="ts">
	import { routes } from '$lib/types/routes';
	import type { Session } from '@supabase/supabase-js';
	export let session: Session | null;
</script>

<div class="flex flex-col sticky top-0" data-testid="header">
	<div class="flex flex-row items-center bg-slate-50 py-3 border-b-4 border-slate-400">
		<div class="px-2 flex-1">
			<div>
				<p class="font-bold">LOGO</p>
			</div>
		</div>

		<div class="flex flex-col content-center px-2 hover:text-sky-500 cursor-pointer">
			{#if session}
				<a href={routes.account} data-testid="link">My Account</a>
			{:else}
				<a href={routes.signin} data-testid="link">Sign in</a>
			{/if}
		</div>
	</div>
</div>
<div />
