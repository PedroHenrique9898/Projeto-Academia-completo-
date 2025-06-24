// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBE96Pt1kQ20ISrz1V2f5ypGElEbvxZN_k",
    authDomain: "projetoacademia-57ee3.firebaseapp.com",
    projectId: "projetoacademia-57ee3",
    storageBucket: "projetoacademia-57ee3.firebasestorage.app",
    messagingSenderId: "331979268594",
    appId: "1:331979268594:web:5e9951fac1c0a57a6c4b6b",
    measurementId: "G-FMTW1J1Q4V"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);