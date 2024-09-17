// Initialize Firebase Auth and Firestore
const auth = window.firebaseAuth;
const db = window.firebaseFirestore;

// Function to initialize Firebase Auth and check for the current user's state
function initFirebaseAuth() {
    // Firebase listens for changes in the authentication state (sign-in or sign-out)
    window.firebaseAuth.onAuthStateChanged(user => {
        const signInButton = document.getElementById("googleSignIn");
        if (user) {
            console.log("User is signed in:", user);

            // If the user is signed in, store their data in localStorage
            const userData = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            };
            storeUserDataLocally(userData);
            
            // Disable the sign-in button and update the UI
            disableSignInButton(signInButton, user);
        } else {
            console.log("No user is signed in.");
            // Enable the sign-in button if no user is signed in
            enableSignInButton(signInButton);
        }
    });
}

// Function to sign in with Google using Firebase Authentication
async function callGoogleSignIn() {
    const provider = new window.GoogleAuthProvider();

    try {
        const result = await window.signInWithPopup(window.firebaseAuth, provider);
        const user = result.user;

        console.log("User signed in:");
        console.log("Name: ", user.displayName);
        console.log("Email: ", user.email);
        console.log("Photo URL: ", user.photoURL);
        console.log("User ID: ", user.uid);

        // Create user data object
        const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
        };

        // Call function to save user data to localStorage
        storeUserDataLocally(userData);

        // Disable the sign-in button after sign-in
        disableSignInButton(document.getElementById("googleSignIn"), user);

    } catch (error) {
        console.error("Error during sign-in: ", error.code, error.message);
    }
}

// Function to log out the user
async function logOut() {
    try {
        await window.firebaseAuth.signOut(); // Firebase sign-out
        console.log("User has been logged out.");

        // Clear user data from localStorage
        localStorage.removeItem('userData');
        console.log("User data has been removed from localStorage.");

        // Optionally, you can update the UI after the user logs out
        // For example, re-enable the sign-in button (or take other actions)
        const signInButton = document.getElementById("googleSignIn");
        enableSignInButton(signInButton);

    } catch (error) {
        console.error("Error logging out: ", error);
    }
}


// Function to save user data to localStorage
function storeUserDataLocally(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data has been saved to localStorage');
}

// Function to retrieve user data from localStorage
function getUserDataFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        console.log("Retrieved user data from localStorage:", userData);
        updateUIAfterSignIn(userData); // Update UI if data is found
    } else {
        console.log("No user data found in localStorage");
    }
}

// Function to update the UI after the user has signed in (optional)
function updateUIAfterSignIn(user) {
    const signInButton = document.getElementById("googleSignIn");
    if (user.photoURL) {
        signInButton.style.backgroundImage = `url(${user.photoURL})`;
        signInButton.style.backgroundSize = 'cover';
        signInButton.style.borderRadius = '50%';
        signInButton.style.width = '50px';
        signInButton.style.height = '50px';
        signInButton.textContent = '';
    }
}

// Function to disable the sign-in button and update the UI after the user is signed in
function disableSignInButton(button, user) {
    button.disabled = true; // Disable the button
    button.textContent = ''; // Optionally remove text
    
    // Optionally show user profile picture or name
    if (user.photoURL) {
        button.style.backgroundImage = `url(${user.photoURL})`;
        button.style.backgroundSize = 'cover';
        button.style.borderRadius = '50%';
        button.style.width = '50px';
        button.style.height = '50px';
    } else {
        button.textContent = `Signed in as ${user.displayName}`; // Show name if no photo
    }
    console.log("Sign-in button disabled.");
}

// Function to enable the sign-in button
function enableSignInButton(button) {
    button.disabled = false; // Enable the button
    button.textContent = 'Sign in with Google'; // Restore the button text
    button.style.backgroundImage = ''; // Remove background image (if any)
    button.style.width = ''; // Reset width
    button.style.height = ''; // Reset height
    console.log("Sign-in button enabled.");
}

// Call the initFirebaseAuth function when the app loads
document.addEventListener('DOMContentLoaded', () => {
    initFirebaseAuth(); // Start listening to authentication state changes
    getUserDataFromLocalStorage(); // Check if there is user data stored
});
