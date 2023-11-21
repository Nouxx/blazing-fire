import { writable, type Writable } from 'svelte/store';

export type UserInformation = {
	firstName: string;
	lastName: string;
} | null;

export const userInformation: Writable<UserInformation> = writable(null);
