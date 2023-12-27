<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import Greeter from '../components/Greeter.svelte';
	import Login from '../components/Login.svelte';
</script>

<div class="font-opensans flex flex-col justify-center w-full items-center">
	<div class="my-3 w-24">
		<img alt="The project logo" src="/logo.png" />
	</div>

	<h1 class="text-3xl font-bold my-3">Blazing Fire</h1>

	<Greeter />

	<Login />

	<div class="mt-5 mb-3 text-gray-400 text-sm">
		<p>(environment: {PUBLIC_ENVIRONMENT})</p>
	</div>
</div>
