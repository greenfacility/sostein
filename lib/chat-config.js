import firebase from 'firebase';
import 'firebase/database'

export const compareId = (id1 = '', id2 = '') => {
	var dt = id1.localeCompare(id2);
	let res = '';
	// console.log(id1, id2);
	if (id1 == '' || id2 == '') return;
	if (dt == -1) {
		res = `${id1}_${id2}`;
	} else if (dt == 0) {
		res = `${id1}_${id2}`;
	} else {
		res = `${id2}_${id1}`;
	}
	return res;
};

export const firebaseConfig = {
	apiKey: 'AIzaSyAVBaykZU4wbnCzvgF6laDz4tPSnAEtbnM',
	authDomain: 'sostein-7e793.firebaseapp.com',
	databaseURL: 'https://sostein-7e793.firebaseio.com',
	projectId: 'sostein-7e793',
	storageBucket: 'sostein-7e793.appspot.com',
	messagingSenderId: '826379151705',
	appId: '1:826379151705:web:85ad2a1d731692758fc448',
	measurementId: 'G-PYM9X47W1L',
};
try {
	firebase.initializeApp(firebaseConfig);
} catch (error) {
	if (!/already exists/.test(error.message)) {
		console.error('Firebase initialization error raised', error.stack);
	}
}
export const database = firebase.database().ref('messages');
export default firebase;
