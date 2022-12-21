// db.ts
import Dexie, { type Table } from 'dexie'

export const enum BoardName {
	CONCEPT = 'concept',
	FACT = 'fact',
	APPLICATION = 'application'
}

export const enum SheetID {
	INITIAL = 'initial'
}

export type WhatTodo = {
	id: string
	title: string
	date: Date
}

export interface TBoard {
	id: number
	name: string
	items: WhatTodo[]
}

export interface Sheet {
	id: string
	name: string
	boards: TBoard[]
}

export const seedData = [
	{
		id: 'initial',
		name: 'Sheet 1',
		boards: [
			{ id: 1, name: 'concept', items: [] },
			{ id: 2, name: 'fact', items: [] },
			{ id: 3, name: 'application', items: [] }
		]
	}
]

export class MySubClassedDexie extends Dexie {
	sheet!: Table<Sheet>

	constructor() {
		super('wtd')
		this.version(1).stores({
			sheet: '++id, &name, boards'
		})
		this.open().then(() => {
			db.sheet.count((count: number) => {
				if (count === 0) {
					db.sheet
						.bulkAdd(seedData)
						.then(() => {
							console.log('Data seeded successfully!')
						})
						.catch((error: never) => {
							console.error('Error seeding data:', error)
						})
				}
			})
		})
	}
}

export const db = new MySubClassedDexie()
