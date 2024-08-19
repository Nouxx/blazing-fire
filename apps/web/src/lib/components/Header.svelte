<script lang="ts">
	import { routes } from '$lib/const/routes';
	import DarkMode from '$lib/components/icons/MoonIcon.svelte';
	import Home from '$lib/components/icons/Home.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
	import User from '$lib/components/icons/User.svelte';
	import type { Session } from '@supabase/supabase-js';
	import ButtonV2 from './ButtonV2.svelte';
	export let session: Session | null;
</script>

<div class="header" data-testid="header">
	<div class="header__logo">
		<a href={routes.home} data-testid="logo">
			<Logo />
		</a>
	</div>

	<div class="header__actions" data-testid="navigation">
		<ButtonV2></ButtonV2>
		<ButtonV2></ButtonV2>
		<ButtonV2></ButtonV2>
		<!-- <button data-testid="toggle-theme">
			<DarkMode />
		</button> -->
		<!-- <a href={routes.home} data-testid="home">
			<Home />
		</a>
		<a href={routes.account} data-testid="account">
			<User />
		</a> -->
	</div>
</div>

<style lang="scss">
	// todo: use alias
	@use '../../style/colors.scss' as *;

	.header {
		background: $color-new-bg-light;
		position: sticky;
		top: 0px;

		height: 4rem;

		display: flex;
		flex-direction: row;
		align-items: center;

		border-color: $color-secondary-bg;
		border-bottom-width: 0.1rem;

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
			flex-direction: row;
			align-items: center;
			gap: 1rem;

			height: 2rem;

			// * {
			// 	height: 2rem;
			// 	width: 2rem;
			// 	// border: 1px solid white;
			// 	background-color: inherit;
			// 	border-radius: 0.35rem;
			// }

			// *:hover {
			// 	background-color: $color-new-bg-dark-hover;

			// 	.icon {
			// 		fill: red;
			// 	}
			// }
		}
	}
</style>
