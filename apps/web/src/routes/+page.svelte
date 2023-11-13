<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import type { GoogleSignInResponse } from '../types/gsi';

	globalThis.handleAuth = async (response: GoogleSignInResponse) => {
		const idToken = response.credential; // https://cloud.google.com/docs/authentication/token-types#id
		console.log('idToken from GSI', response);
		await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({ idToken })
		});
	};
</script>

<h1>Blazing fire</h1>
<p>Environment: {PUBLIC_ENVIRONMENT}</p>

<form method="post" action="?/googleSignIn">
	<button type="submit">Sign In With Google</button>
</form>

<!-- <div
	id="g_id_onload"
	data-client_id="291462974388-uu40umo2shubgklqt49ogofod0n9527o.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="handleAuth"
	data-auto_prompt="false"
/>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="outline"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
/> -->
