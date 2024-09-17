//firebase.js

// Import Firebase app and modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCgtwixZIOJBswVrCSoLNoMkvu_iPrO-to",
    authDomain: "bay-hacks-hackathon.firebaseapp.com",
    projectId: "bay-hacks-hackathon",
    storageBucket: "bay-hacks-hackathon.appspot.com",
    messagingSenderId: "710452009234",
    appId: "1:710452009234:web:bdcaeef736e85cdaae7bcb",
    measurementId: "G-RZS0TRQSV0"
};

// Initialize Firebase App
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized");
} catch (e) {
    console.error("Firebase already initialized:", e);
}

// Initialize Firebase Auth and Firestore with the app
const auth = getAuth(app);
const db = getFirestore(app);

// Attach Firebase functionality to the global `window` object
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseFirestore = db;
window.GoogleAuthProvider = GoogleAuthProvider;
window.signInWithPopup = signInWithPopup;
window.onAuthStateChanged = onAuthStateChanged;
window.collection = collection;
window.getDocs = getDocs;