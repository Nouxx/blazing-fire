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
	// todo: use alias
	@use '../../style/colors.scss' as *;

	.header {
		background: $color-gradient-primary;
		position: sticky;
		top: 0px;

		height: 4.5rem;

		display: flex;
		flex-direction: row;
		align-items: center;

		// temp
		// border-color: rgb(148 163 184 / 1);
		// border-bottom-width: 4px;

		padding: 1rem;

		&__logo {
			display: flex;
			align-items: center;
			flex: 1 1 0%;
			height: 2rem;

			* {
				height: inherit;
			}

			a {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			a:hover {
				opacity: 0.5;
				cursor: pointer;
			}
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 1rem;
			height: 1.35rem;

			* {
				height: inherit;
			}

			a:hover {
				opacity: 0.5;
			}

			button:hover {
				opacity: 0.5;
			}
		}
	}
</style>
