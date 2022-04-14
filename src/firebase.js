// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCoaWHFnptddpmugZ9wQ0nVTK-asUUUdGI",
	authDomain: "dalichat-e20c9.firebaseapp.com",
	projectId: "dalichat-e20c9",
	storageBucket: "dalichat-e20c9.appspot.com",
	messagingSenderId: "711880390196",
	appId: "1:711880390196:web:d476b65859e879ad627c61"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };