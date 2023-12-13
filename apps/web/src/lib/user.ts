import type { Firestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestoreUsersCollectionName } from '$lib/firebase.client';
import type { UserInformation } from '../stores/user-store';

export async function createNewUser(firestore: Firestore, user: UserInformation): Promise<void> {
	const documentReference = doc(firestore, `users/${user.userId}`);
	await setDoc(documentReference, {});
	console.log(`user ${user.userId} document has been created!`);
}

export async function userExists(firestore: Firestore, userId: string): Promise<boolean> {
	const documentReference = doc(firestore, `${firestoreUsersCollectionName}/${userId}`);
	const documentSnapshot = await getDoc(documentReference); // todo: catch errors
	return documentSnapshot.exists();
}
