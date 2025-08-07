// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoIWLWER6ao9ItFSPD9NSoDVEZzqpXh1I",
    authDomain: "bookmyfunctionhalls-14e36.firebaseapp.com",
    projectId: "bookmyfunctionhalls-14e36",
    storageBucket: "bookmyfunctionhalls-14e36.firebasestorage.app",
    messagingSenderId: "404309856824",
    appId: "1:404309856824:web:9984568f65ad4ccc860ccd",
    measurementId: "G-59KKW3FQCE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
