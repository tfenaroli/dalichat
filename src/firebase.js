// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyB6NotnVnxU-YBkW4WaJZoAA-Lbcu2DroY",
	authDomain: "social-media-app-f6c24.firebaseapp.com",
	projectId: "social-media-app-f6c24",
	storageBucket: "social-media-app-f6c24.appspot.com",
	messagingSenderId: "1084402219822",
	appId: "1:1084402219822:web:6f105ae56a775e165218bf",
	measurementId: "G-GSW3LYCX7K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };