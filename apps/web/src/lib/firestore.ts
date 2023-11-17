import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDREdAD5F5zUKGIqO92iYCsOdNUJZApsrQ',
	authDomain: 'blazing-fire-456220.firebaseapp.com',
	projectId: 'blazing-fire-456220',
	storageBucket: 'blazing-fire-456220.appspot.com',
	messagingSenderId: '291462974388',
	appId: '1:291462974388:web:66bb5200712b6ec53b00e1'
};

initializeApp(firebaseConfig);
export const firestore = getFirestore();
