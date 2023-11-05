<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';

	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);

	function invalidateExpiredSession(session: Session) {
		if (session?.expires_at !== session?.expires_at) {
			invalidate('supabase:auth');
		}
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session) {
				invalidateExpiredSession(_session);
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
