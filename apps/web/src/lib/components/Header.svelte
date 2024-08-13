<script lang="ts">
	import { routes } from '$lib/const/routes';
	import Logo from '$lib/icons/Logo.svelte';
	import type { Session } from '@supabase/supabase-js';
	export let session: Session | null;
</script>

<div class="header flex flex-col sticky top-0" data-testid="header">
	<div class="flex flex-row items-center py-3 border-b-4 border-slate-400">
		<div class="px-2 flex-1">
			<div class="flex flex-row header__logo">
				<Logo />
				<!-- <p class="flex items-center logo__text">Blazing Fire</p> -->
			</div>
		</div>

		<div class="content-center px-2 hover:text-sky-500 cursor-pointer">
			{#if session}
				<a href={routes.account} data-testid="link">My Account</a>
			{:else}
				<a href={routes.signin} data-testid="link">Sign in</a>
			{/if}
		</div>
	</div>
</div>
<div />

<style lang="scss">
	.header {
		background: linear-gradient(to bottom right, #0d3b66, #10497e, #135490);

		&__logo:hover {
			opacity: 0.5;
			cursor: pointer;
		}
	}

	.logo__text {
		padding-left: 0.5rem;
		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: bold;
		color: #fca152;
	}
</style>
