<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	onMount(() => {
		console.log('root +layout.svelte!');
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				if (session?.expires_at !== session?.expires_at) {
					// re-run the load function
					invalidate('supabase:auth');
				}
			}
		});
		return () => subscription.unsubscribe();
	});
</script>

<noscript>
	<div class="w-full bg-red-200 text-center py-1">
		<p class="text-sm">JavaScript is blocked by your browser, you might experience issues</p>
	</div>
</noscript>

<slot />
