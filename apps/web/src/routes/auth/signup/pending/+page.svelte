<script lang="ts">
	export let data;
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold my-3">Almost there!</h1>
	<p class="text-sm my-3">
		Check your inbox
		<span class="font-bold">({data.email})</span>
		to verify your email address.
	</p>
	<a href="/auth/signin" class="p-1 my-3 text-center border-2 border-slate-200 shadow-md rounded"
		>Sign in</a
	>
</div>
