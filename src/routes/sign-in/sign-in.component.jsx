import React from 'react';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
} from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('response is ', user);
        createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
};

export default SignIn;