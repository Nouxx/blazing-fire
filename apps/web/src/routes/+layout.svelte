<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session) {
				if (_session?.expires_at !== session?.expires_at) {
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
