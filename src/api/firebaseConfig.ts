import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const app = initializeApp({
    apiKey: "AIzaSyBtVuxCwoYYaCFQpvPUhNNFGhqOK1H0zOI",
    authDomain: "rs-green.firebaseapp.com",
    projectId: "rs-green",
    storageBucket: "rs-green.appspot.com",
    messagingSenderId: "665879065170",
    appId: "1:665879065170:web:b9194752493513a208258b",
    measurementId: "G-1S3RTZM0MQ"
});



export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
