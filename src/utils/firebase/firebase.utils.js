import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/common-config.config';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// allow us to select any accounts from the listed accounts
googleProvider.setCustomParameters({
    "prompt": "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additonalInformation={}) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log("userDocRef", userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log("user snap shot is ", userSnapshot);

    if(!userSnapshot.exists()){
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                photoURL,
                ...additonalInformation
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}