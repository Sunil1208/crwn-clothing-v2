import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { 
    signInAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup 
} from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const hanldeSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password")
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email")
                    break;
                default:
                    console.log("sign in error is ", error)
                    break;
            }
        }

    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('response is ', user);
        createUserDocumentFromAuth(user);
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password</h1>
            <form onSubmit={hanldeSubmit} >

                <FormInput 
                    label="Email"
                    name="email"
                    type="email" 
                    required
                    value={email}
                    onChange={handleChange}
                />

                <FormInput 
                    label="Password"
                    name="password"
                    type="password" 
                    required
                    value={password}
                    onChange={handleChange}
                />

                <div className='buttons-container'>
                    <Button 
                        type='submit'
                        disabled={ !email || !password }
                    >
                    Sign In
                    </Button>
                    
                    <Button
                        type='button'
                        onClick={signInWithGoogle}
                        buttonType='google'
                    >
                    Google sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;