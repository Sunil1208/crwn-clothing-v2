import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('response is ', user);
        createUserDocumentFromAuth(user);
    }

    useEffect(() => {
        async function fetchRedirectResult() {
            const response = await getRedirectResult(auth);
            console.log("redirect response is ", response);
            if(response) {
                const userDocRef = createUserDocumentFromAuth(response.user);
                console.log("user doc ref in redirect is ", userDocRef);
            }
        };
        fetchRedirectResult();
    }, [])
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
};

export default SignIn;