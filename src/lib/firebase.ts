import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
    // Firebase configurations
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'react-chatapp-eca7f.firebaseapp.com',
    projectId: 'react-chatapp-eca7f',
    storageBucket: 'react-chatapp-eca7f.appspot.com',
    messagingSenderId: '719330437939',
    appId: '1:719330437939:web:fa93289b1f3eaad0a5ec46'
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const db = (() => {
    return getFirestore();
})();

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
};

export const signOut = () => {
    firebaseSignOut(auth);
}
