import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7FTTG3UBSUDuETy_JJWOpq_yOdwDmSa4",
  authDomain: "mystorytime-e88bd.firebaseapp.com",
  projectId: "mystorytime-e88bd",
  storageBucket: "mystorytime-e88bd.appspot.com",
  messagingSenderId: "596649773400",
  appId: "1:596649773400:web:5c7e47078f59b4f3ffbd2d",
  measurementId: "G-B665FJBLXE",
  storageBucket: 'gs://mystorytime-e88bd.appspot.com'
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


