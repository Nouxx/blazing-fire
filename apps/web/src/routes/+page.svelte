<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Environment from '$lib/components/Environment.svelte';
	import LogoIcon from '$lib/components/icons/LogoIcon.svelte';
	import { routes } from '$lib/const/routes';
</script>

<div class="flex flex-col items-center mx-5">
	<div class="h-20 mt-4">
		<LogoIcon />
	</div>

	<div class="mb-3">
		<Environment />
	</div>

	<p class="my-3">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae vestibulum risus, in
		consectetur purus. Nulla sed nunc eu quam posuere rhoncus vitae vitae orci. Duis sodales, eros
		tristique finibus rutrum, purus tellus sodales tellus, ultricies sagittis sapien erat at risus.
		Sed sit amet felis rhoncus, malesuada massa eget, interdum sem. Cras placerat ullamcorper justo.
		Suspendisse potenti. Integer consequat luctus metus, et hendrerit quam bibendum non. Nunc
		porttitor sagittis diam, ut pretium lorem convallis eget.
	</p>
	<Button variant="primary" tag="a" href={routes.home} label="Go to app" dataTestId="home" />
</div>
