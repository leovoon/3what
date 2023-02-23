import type { LayoutLoad } from './$types'
import { liveQuery } from 'dexie'
import { db } from '$lib/db'
import { browser } from '$app/environment'

export const load: LayoutLoad = async function () {
	const sheet = liveQuery(() => browser ? db.sheet.get({ id: 'initial' }) : undefined )
	return { sheet }
}
