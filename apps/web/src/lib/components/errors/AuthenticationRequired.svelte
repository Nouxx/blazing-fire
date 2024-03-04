<script>
	import { loginNavigationTypes } from '$lib/types/login-navigation';
	import LoginNavigation from '../LoginNavigation.svelte';
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Whoops!</h1>
	<h2 class="text-sm my-3">You need to be signed in to access this page.</h2>
	<LoginNavigation properties={loginNavigationTypes.signIn} />
</div>
