import { writable } from 'svelte/store';

export type Modal = {
	message: string;
	confirmLabel: string;
	closeLabel: string;
	disabled: boolean;
	error?: string;
	onClose: () => void;
	onConfirm: () => void;
};

type ModalSettableProperty = keyof Pick<Modal, 'error' | 'disabled'>;

/**
 * Store that handles app-wide modal with the follwing rules:
 * - one modal at a time
 * - if a Modal object is in the store, it is displayed. Use `open()` to pop a modal
 * - if there is no Modal (null), it is not displayed. Use `reset()` to remove the modal
 */
export const modalStore = createModalStore();

function createModalStore() {
	const { subscribe, set, update } = writable<Modal | null>(null);

	const open = (modal: Modal) => set(modal);

	const setProperty = <K extends ModalSettableProperty>(property: K, value: Modal[K]) =>
		update((modal) => {
			if (!modal) {
				console.error(`Cannot set ${property}: no modal is currently open.`);
			}
			return modal ? { ...modal, [property]: value } : modal;
		});

	const close = () => set(null);

	return {
		subscribe,
		open,
		close,
		setProperty
	};
}
