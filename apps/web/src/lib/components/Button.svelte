<script lang="ts">
	export let label: string;
	export let id: string;
	export let disabled = false;
</script>

<button
	class="p-1 my-3 px-3 border-2 text-center border-slate-200 shadow-md rounded disabled:text-slate-200"
	data-testid={id}
	{disabled}>{label}</button
>
