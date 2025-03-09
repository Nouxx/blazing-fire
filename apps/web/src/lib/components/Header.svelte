<script lang="ts">
	import { PUBLIC_VERSION } from '$env/static/public';
	import { routes } from '$lib/const/routes';
	import Logo from '$lib/components/icons/LogoIcon.svelte';
	import MiniButton from './MiniButton.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import HomeIcon from '$lib/components/icons/HomeIcon.svelte';

	type Theme = 'light' | 'dark';

	let theme: Theme = 'light';

	function toggleTheme() {
		const currentTheme = theme;
		theme = theme === 'light' ? 'dark' : 'light';
		document.body.classList.remove(currentTheme);
		document.body.classList.add(theme);
	}
</script>

<header class="header" data-testid="header">
	<div class="header__logo">
		<a href={routes.home} data-testid="logo">
			<Logo />
		</a>
		<p class="header__version">version {PUBLIC_VERSION}</p>
	</div>

	<div class="header__actions" data-testid="navigation">
		<MiniButton tag="button" variant="primary" on:click={toggleTheme} dataTestId="toggle-mode">
			{#if theme === 'light'}
				<MoonIcon />
			{/if}
			{#if theme === 'dark'}
				<SunIcon />
			{/if}
		</MiniButton>
		<MiniButton tag="a" variant="primary" href={routes.home} dataTestId="go-to-home">
			<HomeIcon />
		</MiniButton>
		<MiniButton tag="a" variant="primary" href={routes.account} dataTestId="go-to-account">
			<UserIcon />
		</MiniButton>
	</div>
</header>

<style lang="scss">
	@use '../../style' as *;

	.header {
		background: var(--header-color-background);
		position: sticky;
		top: 0px;

		height: 4rem;
		padding: 1rem;

		display: flex;
		flex-direction: row;
		align-items: center;

		border-color: var(--header-color-border);
		border-bottom-width: 1px;

		&__logo {
			display: flex;
			align-items: center;
			flex: 1 1 0%;
			gap: $spacing-8;

			height: 2rem;

			* {
				height: inherit;
			}
		}

		&__version {
			@include font-small;

			display: flex;
			align-items: flex-end;
		}

		&__actions {
			display: flex;
			flex-direction: row;
			align-items: center;

			gap: 0.5rem;
		}
	}
</style>
