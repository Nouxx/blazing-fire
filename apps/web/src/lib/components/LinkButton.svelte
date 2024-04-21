<script lang="ts">
	export let link: string;
	export let label: string;
</script>

<a
	data-testid="link"
	href={link}
	class="p-1 my-3 px-3 border-2 text-center border-slate-200 shadow-md rounded"
>
	{label}
</a>
