import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCM6ObP2geriR_dN0UQPW2hvVDEIsSV-VA",
    authDomain: "petadopt-878e9.firebaseapp.com",
	databaseURL: "https://petadopt-878e9-default-rtdb.firebaseio.com",
    projectId: "petadopt-878e9",
    storageBucket: "petadopt-878e9.appspot.com",
    messagingSenderId: "42814397996",
    appId: "1:42814397996:web:369b1d2228a778d92e7b89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.auth().languageCode = 'bg';

export default firebase;
