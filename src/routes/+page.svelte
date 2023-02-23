<script lang="ts">
	import { page } from '$app/stores'
	import Board from '$lib/components/Board.svelte'
	import LoadingBoard from '$lib/components/LoadingBoard.svelte'
	import type { Sheet } from '$lib/db'
	$: sheetStore = $page.data.sheet
	$: sheet = $sheetStore as Sheet
</script>

{#if sheet}
	<Board columnItems={sheet?.boards} id={sheet?.id} />
{:else}
	<LoadingBoard />
{/if}
