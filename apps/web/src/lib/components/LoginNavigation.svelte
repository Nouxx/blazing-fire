<script lang="ts">
	import type { LoginNavigationProperties } from '$lib/types/login-navigation';

	export let properties: LoginNavigationProperties;
</script>

<div data-testid="login-navigation">
	<h2 class="text-sm my-3" data-testid="title">{properties.title}</h2>

	<a
		data-testid="link"
		href={properties.buttonLink}
		class="p-1 my-3 w-1/6 border-2 text-center border-slate-200 shadow-md rounded"
		>{properties.buttonLabel}</a
	>
</div>
