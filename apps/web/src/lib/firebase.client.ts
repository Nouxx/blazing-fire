// todo: split this in 2 files (auth, firestore)

import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, connectAuthEmulator, getAuth } from 'firebase/auth';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_EMULATOR,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const firestore = getFirestore();
const auth = getAuth();

if (PUBLIC_FIREBASE_EMULATOR === 'true') {
	connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
	connectAuthEmulator(auth, 'http://localhost:9099');
}

const googleAuthProvider = new GoogleAuthProvider();

export { firestore, auth, googleAuthProvider };

export const firestoreUsersCollectionName = 'users';
