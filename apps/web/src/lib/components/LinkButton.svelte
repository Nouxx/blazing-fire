<script lang="ts">
	export let link: string;
	export let label: string;
	export let id: string;
	const dataTestId = `link-to-${id}`
</script>

<a
	data-testid={dataTestId}
	href={link}
	class="p-1 my-3 px-3 border-2 text-center border-slate-200 shadow-md rounded"
>
	{label}
</a>
