<script lang="ts">
	export let data;

	let { session } = data;
	$: ({ session } = data);

	$: {
		console.log('user', session?.user.email);
	}
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="text-3xl font-bold my-3">Home</h1>
</div>
