<script lang="ts">
	import { routes } from '$lib/const/routes';
	import Logo from '$lib/components/icons/LogoIcon.svelte';
	import type { Session } from '@supabase/supabase-js';
	import ButtonV2 from './ButtonV2.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
	export let session: Session | null;

	type Theme = 'light' | 'dark';

	let theme: Theme = 'light';

	function toggleTheme() {
		const currentTheme = theme;
		theme = theme === 'light' ? 'dark' : 'light';
		document.body.classList.remove(currentTheme);
		document.body.classList.add(theme);
	}
</script>

<div class="header" data-testid="header">
	<div class="header__logo">
		<a href={routes.home} data-testid="logo">
			<Logo />
		</a>
	</div>

	<div class="header__actions" data-testid="navigation">
		<ButtonV2 type="button" on:click={toggleTheme}>
			{#if theme === 'light'}
				<MoonIcon />
			{/if}
			{#if theme === 'dark'}
				<SunIcon />
			{/if}
		</ButtonV2>
		<ButtonV2 type="link" href={routes.home}>
			<HomeIcon />
		</ButtonV2>
		<ButtonV2 type="link" href={routes.account}>
			<UserIcon />
		</ButtonV2>
	</div>
</div>

<style lang="scss">
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

			height: 2rem;

			* {
				height: inherit;
			}
		}

		&__actions {
			display: flex;
			flex-direction: row;
			align-items: center;
			
			gap: 0.5rem;
			height: 2rem;
		}
	}
</style>
