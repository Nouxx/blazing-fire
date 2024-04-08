<script lang="ts">
	import Environment from '$lib/components/Environment.svelte';
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">Blazing Fire</h1>

	<div class="mb-3">
		<Environment />
	</div>

	<img alt="The project logo" src="/logo.png" class="w-24 my-3" />

	<p class="my-3">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae vestibulum risus, in
		consectetur purus. Nulla sed nunc eu quam posuere rhoncus vitae vitae orci. Duis sodales, eros
		tristique finibus rutrum, purus tellus sodales tellus, ultricies sagittis sapien erat at risus.
		Sed sit amet felis rhoncus, malesuada massa eget, interdum sem. Cras placerat ullamcorper justo.
		Suspendisse potenti. Integer consequat luctus metus, et hendrerit quam bibendum non. Nunc
		porttitor sagittis diam, ut pretium lorem convallis eget.
	</p>
	<a href="/home" class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" data-testid="link"
		>Go to app</a
	>
</div>
