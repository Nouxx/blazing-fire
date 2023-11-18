<script lang="ts">
	import { PUBLIC_HOST } from '$env/static/public';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	export let data;

	async function fetchUser() {
		const res = await fetch(`${PUBLIC_HOST}/user`, {
			method: 'GET'
		});
		return await res.json();
	}
	const userPromise = fetchUser();
</script>

<h1>Blazing fire</h1>
<p>Environment: {PUBLIC_ENVIRONMENT}</p>

<form method="post" action="?/googleSignIn">
	<p>
		Hello,
		{#await userPromise}
			you...
		{:then user}
			{user.firstname}!
		{/await}
	</p>
	<button type="submit">Sign In With Google</button>
	<p>id token = {data.idToken}</p>
	<p>access token = {data.accessToken}</p>
</form>
