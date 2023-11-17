<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	export let data;
</script>

<h1>Blazing fire</h1>
<p>Environment: {PUBLIC_ENVIRONMENT}</p>

<form method="post" action="?/googleSignIn">
	<button type="submit">Sign In With Google</button>
	<p> token = {data.token}</p>
</form>
