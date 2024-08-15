<script lang="ts">
	import { routes } from '$lib/const/routes';
	import DarkMode from '$lib/icons/DarkMode.svelte';
	import Home from '$lib/icons/Home.svelte';
	import Logo from '$lib/icons/Logo.svelte';
	import User from '$lib/icons/User.svelte';
	import type { Session } from '@supabase/supabase-js';
	export let session: Session | null;
</script>

<div class="header flex flex-col" data-testid="header">
	<div class="flex flex-row items-center py-3 border-b-4 border-slate-400">
		<div class="px-2 flex-1">
			<div class="flex flex-row">
				<a class="header__logo" href={routes.home} data-testid="logo">
					<Logo />
				</a>
				<!-- <p class="flex items-center logo__text">Blazing Fire</p> -->
			</div>
		</div>

		<div class="header__actions px-2" data-testid="navigation">
			<button data-testid="toggle-theme" >
				<DarkMode/>
			</button>
			<a href={routes.home} data-testid="home">
				<Home/>
			</a>
			<a href={routes.account} data-testid="account">
				<User/>
			</a>

		</div>
	</div>
</div>
<div />

<style lang="scss">


	.header {
		background: linear-gradient(to bottom right, #0d3b66, #10497e, #135490);
		position: sticky;
		top: 0px;

		&__logo:hover {
			opacity: 0.5;
			cursor: pointer;
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
	}

	.logo__text {
		padding-left: 0.5rem;
		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
