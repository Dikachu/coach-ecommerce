import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info.
    const user = result.user;
    return user;   
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB3PRi_7-xlFNAbE-C7UUuCfd1WyY0ynAU",
//     authDomain: "e-commerce-59439.firebaseapp.com",
//     projectId: "e-commerce-59439",
//     storageBucket: "e-commerce-59439.firebasestorage.app",
//     messagingSenderId: "667046182449",
//     appId: "1:667046182449:web:12ad4995e2d43169701f10",
//     measurementId: "G-NGQZDLE0J0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);