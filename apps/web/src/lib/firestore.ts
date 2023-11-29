import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { FIRESTORE_EMULATOR } from '$env/static/private';

const firebaseConfig = {
	apiKey: 'AIzaSyDREdAD5F5zUKGIqO92iYCsOdNUJZApsrQ',
	authDomain: 'blazing-fire-456220.firebaseapp.com',
	projectId: 'blazing-fire-456220',
	storageBucket: 'blazing-fire-456220.appspot.com',
	messagingSenderId: '291462974388',
	appId: '1:291462974388:web:66bb5200712b6ec53b00e1'
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

if (FIRESTORE_EMULATOR === 'true') {
	connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

export { firestore };
