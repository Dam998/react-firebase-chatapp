import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
    // Firebase configurations
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
