// Import Firebase app and modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
return initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getFirestore, collection, getDocs;
