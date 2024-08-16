<script lang="ts">
	import { routes } from '$lib/const/routes';
	import DarkMode from '$lib/icons/DarkMode.svelte';
	import Home from '$lib/icons/Home.svelte';
	import Logo from '$lib/icons/Logo.svelte';
	import User from '$lib/icons/User.svelte';
	import type { Session } from '@supabase/supabase-js';
	export let session: Session | null;
</script>

<div class="header" data-testid="header">
	<div class="header__logo">
		<a href={routes.home} data-testid="logo">
			<Logo />
		</a>
		<!-- <p class="flex items-center logo__text">Blazing Fire</p> -->
	</div>

	<div class="header__actions" data-testid="navigation">
		<button data-testid="toggle-theme">
			<DarkMode />
		</button>
		<a href={routes.home} data-testid="home">
			<Home />
		</a>
		<a href={routes.account} data-testid="account">
			<User />
		</a>
	</div>
</div>

<style lang="scss">
	@use "../../style/colors.scss" as *;

	.header {
		background: $color-gradient-primary;
		position: sticky;
		top: 0px;

		display: flex;
		flex-direction: row;
		align-items: center;

		// temp
		border-color: rgb(148 163 184 / 1);
		border-bottom-width: 4px;

		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;

		&__logo {
			display: flex;
			flex: 1 1 0%;

			a:hover {
				opacity: 0.5;
				cursor: pointer;
			}
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 1rem;
			height: 1.5rem;

			* {
				height: inherit;
			}
		}
	}

	.logo__text {
		padding-left: 0.5rem;
		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
