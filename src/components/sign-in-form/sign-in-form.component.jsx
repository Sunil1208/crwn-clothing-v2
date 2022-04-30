import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;


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
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch (error) {
            console.log("error in sign in form is ", error)
        }

    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    return (
        <SignInContainer>
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

                <ButtonsContainer >
                    <Button 
                        type='submit'
                        disabled={ !email || !password }
                    >
                    Sign In
                    </Button>
                    
                    <Button
                        type='button'
                        onClick={signInWithGoogle}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                    Google sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;