<script lang="ts">
	import type { PageData } from './$types'
	import lz from 'lz-string'
	import Board from '$lib/components/Board.svelte'
	import { db, SheetID, type Sheet } from '$lib/db'
	import { browser } from '$app/environment'
	import { liveQuery, type Observable } from 'dexie'
	import LoadingBoard from '$lib/components/LoadingBoard.svelte'
	import { onMount } from 'svelte'

	interface Props {
		data: PageData
	}
	let { data }: Props = $props()

	let sheetStore: Observable<Sheet | undefined>

	if (browser) {
		sheetStore = liveQuery(() => (browser ? db.sheet.get({ id: SheetID.SHARED }) : undefined))
	}

	onMount(() => {
		const sharedSheet: Sheet = JSON.parse(
			lz.decompressFromEncodedURIComponent(data.slug || '') || ''
		)

		if (!$sheetStore) {
			db.sheet
				.add(sharedSheet, SheetID.SHARED)
				.then(() => {
					console.log('Added share')
				})
				.catch(() => {
					db.sheet
						.update(sharedSheet, {
							name: sharedSheet.name,
							boards: sharedSheet.boards
						})
						.then(() => {
							console.log('Updated shared sheet to db.')
						})
				})
		}
	})
	let sheet = $derived($sheetStore)
</script>

{#if sheet}
	<Board columnItems={sheet.boards} id={sheet.id} />
{:else}
	<LoadingBoard />
{/if}
