import type { User as FirebaseUser } from 'firebase/auth';
import { writable } from 'svelte/store';

export type User = {
	isLoggedIn: boolean;
	information: UserInformation | null;
	isLoading: boolean;
};

export type UserInformation = {
	userId: string;
	name: string | null;
	photoUrl: string | null;
};

export function toUserInformation(firebaseUser: FirebaseUser): UserInformation {
	return {
		userId: firebaseUser.uid,
		name: firebaseUser.displayName || null,
		photoUrl: firebaseUser.providerData[0].photoURL || null
	};
}

export const userStore = writable<User>({
	isLoggedIn: false,
	information: null,
	isLoading: true
});
