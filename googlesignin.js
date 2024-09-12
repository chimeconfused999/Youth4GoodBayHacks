const { initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getFirestore, collection, getDocs } = require('./firebase.js')
// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyCgtwixZIOJBswVrCSoLNoMkvu_iPrO-to",
    authDomain: "bay-hacks-hackathon.firebaseapp.com",
    projectId: "bay-hacks-hackathon",
    storageBucket: "bay-hacks-hackathon.appspot.com",
    messagingSenderId: "710452009234",
    appId: "1:710452009234:web:bdcaeef736e85cdaae7bcb",
    measurementId: "G-RZS0TRQSV0"
};

// Initialize Firebase App (try-catch in case of multiple initializations)
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized");
} catch (e) {
    console.error("Firebase already initialized:", e);
}

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Function to get cities from Firestore
async function getCities() {
    try {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(cityList); // Log to check if data is fetched
        return cityList;
    } catch (e) {
        console.error("Error getting cities: ", e);
    }
}

// Function to sign in with Google using Firebase Authentication
async function callGoogleSignIn(){
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // Get user info and token
        const token = result.credential.accessToken;
        const user = result.user;
        console.log("User signed in: ", user);  // Log user info to verify
    } catch (error) {
        console.error("Error during sign-in: ", error.code, error.message);
    }
}

// Auth State Change Listener (optional to check if user is signed in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("No user is signed in");
    }
});