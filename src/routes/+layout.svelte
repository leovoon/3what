<script lang="ts">
	import '../app.css'
	import { nanoid } from 'nanoid/non-secure'
	import lz from 'lz-string'
	import { getModalStore, initializeStores } from '@skeletonlabs/skeleton'
	import { db, seedData, SheetID, type Sheet, type TBoard } from '$lib/db'
	import { browser } from '$app/environment'
	import { LightSwitch, Modal, type ModalSettings } from '@skeletonlabs/skeleton'
	import type { LayoutData } from './$types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	interface Props { data: LayoutData, children: any }

	let { data, children }: Props = $props();

	let sheet = $state(data.sheet)
	let sheetValue = $derived($sheet)
	let boards = $derived(sheetValue?.boards)
	let isPreview = $derived($page.url.pathname.includes('shared'))

	function checkItemsNotEmpty(data: TBoard[]) {
    for (let item of data) {
        if (item.items.length > 0) {
            return true;
        }
    }
    return false;
}
	let notEmpty = $derived(checkItemsNotEmpty(boards ?? []))
	let idByMode = $derived(isPreview ? SheetID.SHARED : SheetID.INITIAL)
	let encodedURI = $derived(lz.compressToEncodedURIComponent(
		JSON.stringify({
			id: SheetID.SHARED,
			name: 'Shared 3board @' + new Date().toLocaleString(),
			boards: boards
		})
	))

		
	initializeStores()
	const modalStore = getModalStore()

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
					.equals(idByMode)
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
					if (isPreview) {
						goto('/', { replaceState: true })
					}
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

	function triggerShare(): void {
		const shareUrl = `${$page.url.origin}/shared/${encodedURI}`

		const prompt: ModalSettings = {
			type: 'alert',
			title: 'Share this 3what',
			body: `
			<p>
				Copy the link below to share with others. 
			<p>
			<a href="${shareUrl}" target="_blank" rel="noopener noreferrer">${shareUrl}</a>`
		}
		if (browser) modalStore.trigger(prompt)
	}

	function triggerAlertEmpty(): void {
		const prompt: ModalSettings = {
			type: 'alert',
			title: 'Info',
			body: 'Cannot share empty board.'
		}
		if (browser) modalStore.trigger(prompt)
	}
	$inspect(boards); // will console.log when `count` or `message` change

</script>

<Modal />

<header class="flex items-center justify-between p-2">
	<LightSwitch />
	<div>
		<button class="btn-icon" on:click={triggerAddPrompt}>+</button>
		{#if notEmpty}
			<button class="btn btn-sm bg-warning-300 text-base-token" on:click={triggerResetPrompt}
				>Clear</button
			>
			<button
				class="btn btn-sm bg-primary-300 text-base-token"
				on:click={!notEmpty ? triggerAlertEmpty : triggerShare}
			>
				<span>↗️ Share </span>
			</button>
		{/if}
	</div>
	<button on:click={() => goto('/')}>
		<h1 class="h1">
			<span
				class="to-accent-500 bg-gradient-to-r from-primary-500 box-decoration-clone bg-clip-text text-transparent"
				>3what</span
			>
		</h1>
	</button>
</header>
<main>
	{@render children()}
</main>
<footer class="text-accent-600-300-token absolute bottom-0 p-1 text-xs">
	by
	<a href="https://github.com/leovoon/3what"> leovoon</a>
</footer>
