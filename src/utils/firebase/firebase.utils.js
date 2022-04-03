import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/common-config.config';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// allow us to select any accounts from the listed accounts
provider.setCustomParameters({
    "prompt": "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
