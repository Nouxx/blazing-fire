<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import Greeter from './Greeter.svelte';
	export let data;

	function isUserLoggedIn(idToken: string | undefined, accessToken: string | undefined): boolean {
		return !idToken || !accessToken ? false : true;
	}

	const loggedIn = isUserLoggedIn(data.idToken, data.accessToken);
</script>

<div class="font-opensans flex flex-col items-center wrappe">
	<div class="my-4 w-28">
		<img alt="The project logo" src="/logo.png" />
	</div>

	<h1 class="text-3xl font-bold my-3">Blazing Fire</h1>

	<Greeter idToken={data.idToken} />

	<div>
		{#if loggedIn}
			<form method="post" action="?/logout">
				<button type="submit">Logout</button>
			</form>
		{:else}
			<form method="post" action="?/googleSignIn">
				<div>
					To use the app, you must
					<button class="inline underline text-blue-500" type="submit">login</button>
					first.
				</div>
			</form>
		{/if}
	</div>

	<div class="my-5 text-gray-400 text-sm">
		<p>(environment: {PUBLIC_ENVIRONMENT})</p>
	</div>
</div>
