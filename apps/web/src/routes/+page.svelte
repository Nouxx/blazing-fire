<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import Greeter from './Greeter.svelte';
	export let data;

	function isUserLoggedIn(idToken: string | undefined, accessToken: string | undefined): boolean {
		return !idToken || !accessToken ? false : true;
	}

	const loggedIn = isUserLoggedIn(data.idToken, data.accessToken);
</script>

<section>
	<h1>Blazing fire</h1>
	<p>Environment: {PUBLIC_ENVIRONMENT}</p>
</section>

<section>
	<Greeter idToken={data.idToken} />
	{#if loggedIn}
		<form method="post" action="?/logout">
			<button type="submit">Logout</button>
		</form>
	{:else}
		<form method="post" action="?/googleSignIn">
			<button type="submit">Sign In With Google</button>
		</form>
	{/if}
</section>

<section class="grey-content">
	<p>id token = {data.idToken}</p>
	<p>access token = {data.accessToken}</p>
</section>

<style>
	.grey-content {
		color: grey;
	}
</style>
