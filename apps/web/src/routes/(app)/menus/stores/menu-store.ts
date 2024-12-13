import { writable } from 'svelte/store';

export type MenuPageStore = {
	isEditionEnabled: boolean;
};

type MenuPageProperties = keyof MenuPageStore;

const INIT_STATE: MenuPageStore = {
	isEditionEnabled: false
};

export const menuPageStore = createMenuPageStore();

function createMenuPageStore() {
	const { subscribe, update } = writable<MenuPageStore>(INIT_STATE);

	const setProperty = <K extends MenuPageProperties>(property: K, value: MenuPageStore[K]) =>
		update((store) => {
			return { ...store, [property]: value };
		});

	return {
		setProperty,
		subscribe
	};
}
