import { writable } from 'svelte/store';

export type Modal = {
	message: string;
	confirmLabel: string;
	closeLabel: string;
	disabled: boolean;
	error?: string;
	onClose?: () => void;
	onConfirm?: () => void;
};

function createModalStore() {
	const { subscribe, set } = writable<Modal | null>(null);

	return {
		subscribe,
		set,
		reset: () => set(null)
	};
}

/**
 * Store that handles app-wide modal with the follwing rules:
 * - one modal at a time
 * - if a Modal object is in the store, it is displayed. use `set()` to pop a modal
 * - if there is no Modal (null), it is not displayed. use `reset()` to remove the modal
 */
export const modalStore = createModalStore();
