import { writable } from 'svelte/store';

import type { Menu } from '$lib/types/menu';

export const menusStore = writable<Menu[]>([]);

// todo: custom store
