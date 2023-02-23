import type { LayoutLoad } from './$types'
import { liveQuery } from 'dexie'
import { db } from '$lib/db'
import { browser } from '$app/environment'

export const load: LayoutLoad = async function () {
	let sheet
	if(browser) {
		sheet = liveQuery(() => db.sheet.get({ id: 'initial' }))
	}
	return { sheet }
}
