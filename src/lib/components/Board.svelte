<script lang="ts">
	import { flip } from 'svelte/animate'
	import { dndzone } from 'svelte-dnd-action'
	import { db, BoardName, type TBoard, type WhatTodo } from '$lib/db'
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'
	import { browser } from '$app/environment'

	interface Props {
		columnItems: TBoard[]
		id: string
	}

	let { columnItems, id }: Props = $props()

	const modalStore = getModalStore()
	const flipDurationMs = 300

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
				return 'variant-filled-primary'
			case BoardName.FACT:
				return 'variant-filled-secondary'
			case BoardName.APPLICATION:
				return 'variant-filled-tertiary'
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
		<div class="card-glass relative h-[33%] rounded-container-token sm:h-full">
			<h1 class="text-surface-400-500-token absolute bottom-0 right-0 px-4 py-2 text-4xl">
				{`${chinese(column.name)} ${column.name}`}
			</h1>

			<div
				class="w-inherit ring-outline-token h-full min-h-full space-x-1 space-y-1 overflow-auto rounded-container-token"
				use:dndzone={{ items: column.items, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
			>
				{#each column.items as item (item.id)}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="btn p-2 transition-colors {colorBasedOnColumn(column.name)}"
						animate:flip={{ duration: flipDurationMs }}
						on:click={() => triggerEditPrompt(item)}
						on:keydown={() => triggerEditPrompt(item)}
					>
						{item.title}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
