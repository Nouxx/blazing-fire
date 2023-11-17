import type { User } from '$lib/types/user';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

export async function createNewUser(firestore: Firestore, user: User) {
	const documentReference = doc(firestore, `users/${user.userId}`);
	await setDoc(documentReference, user);
	console.log(`user ${user.userId} document has been created!`);
}

export async function userExists(firestore: Firestore, userId: string) {
	const documentReference = doc(firestore, `users/${userId}`);
	const documentSnapshot = await getDoc(documentReference);
	console.log(`user ${userId} already exists!`);
	return documentSnapshot.exists();
}

export async function getUser(firestore: Firestore, user: User) {
	if (await userExists(firestore, user.userId)) {
		return user;
	} else {
		return await createNewUser(firestore, user);
	}
}
