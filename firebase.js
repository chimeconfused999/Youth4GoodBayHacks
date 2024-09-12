    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
    import {
        getAuth,
        onAuthStateChanged,
    } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

    
    // Follow this pattern to import other Firebase services
    // import { } from 'firebase/<service>';

    // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCgtwixZIOJBswVrCSoLNoMkvu_iPrO-to",
        authDomain: "bay-hacks-hackathon.firebaseapp.com",
        projectId: "bay-hacks-hackathon",
        storageBucket: "bay-hacks-hackathon.appspot.com",
        messagingSenderId: "710452009234",
        appId: "1:710452009234:web:bdcaeef736e85cdaae7bcb",
        measurementId: "G-RZS0TRQSV0"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Get a list of cities from your database
    async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
    }

    function callGoogleSignIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }