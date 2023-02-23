<script lang="ts">
	import { flip } from 'svelte/animate'
	import { dndzone } from 'svelte-dnd-action'
	import type { ModalSettings } from '@skeletonlabs/skeleton/utilities/Modal/types'
	import { db, BoardName, type TBoard, type WhatTodo } from '$lib/db'
	import { modalStore } from '@skeletonlabs/skeleton/utilities/Modal/stores'
	import { browser } from '$app/environment'

	export let columnItems: TBoard[]
	export let id: string

	const flipDurationMs = 300

	function handleDndConsiderColumns(e: CustomEvent<DndEvent>) {
		columnItems = e.detail.items
	}
	function handleDndFinalizeColumns(e: CustomEvent<DndEvent>) {
		columnItems = e.detail.items
	}
	function handleDndConsiderCards(cid: number, e: CustomEvent<DndEvent>) {
		const colIdx = columnItems.findIndex((c) => c.id === cid)
		columnItems[colIdx].items = e.detail.items
		columnItems = [...columnItems]
	}
	function handleDndFinalizeCards(cid: number, e: CustomEvent<DndEvent>) {
		const colIdx = columnItems.findIndex((c) => c.id === cid)
		columnItems[colIdx].items = e.detail.items
		columnItems = [...columnItems]
		saveToDB(columnItems)
	}

	function saveToDB(items: TBoard[]): TBoard[] {
		if (browser)
			db.sheet
				.where('id')
				.equals(id)
				.modify((sheet) => {
					sheet.boards = items
				})
		return items
	}

	function triggerEditPrompt(wtd: WhatTodo): void {
		const prompt: ModalSettings = {
			type: 'prompt',
			title: 'Edit',
			body: 'Rename the thing to learn.',
			value: wtd.title,
			response: (r: string) => {
				if (!r) return
				const res = db.sheet
					.where('id')
					.equals(id)
					.modify((sheet) => {
						sheet.boards.forEach((board) => {
							board.items.forEach((item) => {
								if (item.id === wtd.id) {
									item.title = r
								}
							})
						})
					})
			}
		}

		modalStore.trigger(prompt)
	}

	function colorBasedOnColumn(columName: string) {
		switch (columName) {
			case BoardName.CONCEPT:
				return 'btn-filled-primary'
			case BoardName.FACT:
				return 'btn-filled-accent'
			case BoardName.APPLICATION:
				return 'btn-filled-tertiary'
		}
	}

	function chinese(name: string) {
		switch (name) {
			case BoardName.CONCEPT:
				return '概念'
			case BoardName.FACT:
				return '事實'
			case BoardName.APPLICATION:
				return '應用'
		}
	}
</script>

<section class="relative h-[90vh] max-h-full min-h-[90vh] p-2 sm:grid sm:grid-cols-3">
	{#each columnItems as column (column.id)}
		<div class="card-glass rounded-container-token h-[33%] sm:h-full">
			<h1 class="absolute text-4xl px-4 py-2 bottom-0 right-0 text-surface-400-500-token">
				{`${chinese(column.name)} ${column.name}`}
			</h1>

			<div
				class="rounded-container-token space-x-1 space-y-1 ring-outline-token w-inherit h-full min-h-full overflow-auto  "
				use:dndzone={{ items: column.items, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
			>
				{#each column.items as item (item.id)}
					<div
						class="btn p-2 transition-colors {colorBasedOnColumn(column.name)}"
						animate:flip={{ duration: flipDurationMs }}
						on:click={() => triggerEditPrompt(item)}
						on:keydown
					>
						{item.title}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
