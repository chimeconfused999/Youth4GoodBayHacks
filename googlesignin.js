// Function to get cities from Firestore
async function getCities() {
    try {
        const citiesCol = window.firebaseFirestore.collection('cities');
        const citySnapshot = await citiesCol.get();
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(cityList); // Log to check if data is fetched
        return cityList;
    } catch (e) {
        console.error("Error getting cities: ", e);
    }
}

// Function to sign in with Google using Firebase Authentication
// Function to sign in with Google using Firebase Authentication
// Function to sign in with Google using Firebase Authentication
// Function to sign in with Google using Firebase Authentication
// Function to sign in with Google using Firebase Authentication
async function callGoogleSignIn(){
    const provider = new window.GoogleAuthProvider();

    try {
        const result = await window.signInWithPopup(window.firebaseAuth, provider);
        const signInButton = document.getElementById("googleSignIn")
        
        // Always available: user info
        const user = result.user;
        // If user has a profile picture, update the button
        // If user has a profile picture, update the button
        if (user.photoURL) {
            signInButton.style.backgroundImage = `url(${user.photoURL})`;
            signInButton.style.backgroundSize = 'cover';
            signInButton.style.borderRadius = '50%'; // Make it circular
            signInButton.style.width = '50px'; // Set button width (adjust as needed)
            signInButton.style.height = '50px'; // Set button height (adjust as needed)
            signInButton.textContent = ''; // Remove the button text
        }
        
        console.log("User signed in:");
        console.log("Name: ", user.displayName);
        console.log("Email: ", user.email);
        console.log("Photo URL: ", user.photoURL);
        console.log("User ID: ", user.uid);
        //alert("Hello, ", user.email)
        var username = user.displayName;
        console.log(user.displayName);
        window.name = username;

    } catch (error) {
        console.error("Error during sign-in: ", error.code, error.message);
    }

}