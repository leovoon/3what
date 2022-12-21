// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

// dnd types
declare type Item = import('svelte-dnd-action').Item
declare type DndEvent<ItemType = TBoard> = import('svelte-dnd-action').DndEvent<ItemType>
declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		onconsider?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void
		onfinalize?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void
	}
}
