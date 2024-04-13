<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import LinkButton from '$lib/components/LinkButton.svelte';

	export let data;
	let { session, supabase } = data;
	$: ({ session } = data);

	onMount(async () => {
		(await supabase.auth.getSession()).data.session;
		if (session === null) {
			goto('/auth/signin/error');
		}
	});
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">My Account</h1>

	<p class="text-sm my-3">{session?.user.email}</p>

	<form method="post" action="?/signOut">
		<button class="p-1 my-3 border-2 border-slate-200 shadow-md rounded" data-testid="logout"
			>Logout</button
		>
	</form>

	<LinkButton label="Go back to app" link="/home" />
</div>
