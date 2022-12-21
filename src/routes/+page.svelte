<script lang="ts">
	import { GradientHeading, LightSwitch, Modal, type ModalSettings } from '@skeletonlabs/skeleton'
	import Board from '$lib/components/Board.svelte'
	import { modalStore } from '@skeletonlabs/skeleton'
	import { db, seedData, SheetID, type Sheet } from '$lib/db'
	import { browser } from '$app/environment'
	import { liveQuery } from 'dexie'
	import { nanoid } from 'nanoid/non-secure'

	$: sheet = liveQuery(() => (browser ? db.sheet.get({ id: SheetID.INITIAL }) : {}))
	$: sheetValue = $sheet as Sheet
	$: boards = sheetValue?.boards
	$: notEmpty = boards?.map((b) => b.items.length).reduce((a, b) => a + b, 0) > 0

	function triggerAddPrompt(): void {
		const prompt: ModalSettings = {
			type: 'prompt',
			title: 'New what-to-do',
			body: 'Name the new topic to learn.',
			value: '',
			response: (r: string) => {
				if (!r || r === undefined) return
				let newTodo = {
					id: nanoid(),
					title: r,
					date: new Date()
				}
				db.sheet
					.where('id')
					.equals(SheetID.INITIAL)
					.modify((sheet) => {
						sheet.boards[0].items.unshift(newTodo)
					})
			}
		}
		if (browser) modalStore.trigger(prompt)
	}

	function triggerResetPrompt(): void {
		const confirm: ModalSettings = {
			type: 'confirm',
			title: 'Confirm delete',
			body: 'Are you sure to clear them all?',
			// confirm = TRUE | cancel = FALSE
			response: (r: boolean) => {
				if (r === true) {
					db.sheet.clear().then(() => {
						db.sheet.bulkAdd(seedData).then(() => {
							console.log('Users table reset to its initial state')
						})
					})
				}
			}
		}
		modalStore.trigger(confirm)
	}
</script>

<Modal />

<header class="flex items-center justify-between p-2  ">
	<LightSwitch />

	<div>
		<button class="btn-icon" on:click={triggerAddPrompt}>+</button>
		{#if notEmpty}
			<button class="btn-icon" on:click={triggerResetPrompt}>🧹</button>
		{/if}
	</div>

	<GradientHeading tag="h1" direction="bg-gradient-to-r" from="from-primary-300" to="to-accent-200"
		>3what</GradientHeading
	>
</header>

<main>
	{#if boards}
		<Board columnItems={boards} />
	{/if}
</main>

<footer class="absolute text-accent-600-300-token bottom-0 text-xs p-1">
	by
	<a href="https://github.com/leovoon/3what"> leovoon</a>
</footer>
