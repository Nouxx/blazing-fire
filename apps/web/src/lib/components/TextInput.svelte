<script lang="ts">
	export let value: string;
    export let disabled: boolean;
</script>

<input
	type="text"
	name="name"
	bind:value
	autocomplete="off"
/>

<style lang="scss">
    input {
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        outline: none;
        border-radius: 8px;
        width: fit-content;
        background-color: var(--input-color-background-primary);
    }
</style>
