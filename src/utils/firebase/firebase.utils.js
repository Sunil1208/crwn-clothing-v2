import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/common-config.config';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// allow us to select any accounts from the listed accounts
provider.setCustomParameters({
    "prompt": "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
                photoURL
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
}