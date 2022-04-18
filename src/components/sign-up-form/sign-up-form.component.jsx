import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

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

        if(password !== confirmPassword){
            alert("Password doesn't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                alert("Cannot create user, email already in use");
            } else {
                console.log("error in sign up ", error.message)
            }
        }

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={hanldeSubmit} >
                <FormInput 
                    label="Display Name"
                    name="displayName"
                    type="text" 
                    required
                    value={displayName}
                    onChange={handleChange}
                />

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

                <FormInput 
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={handleChange}
                />

                <Button 
                    type='submit'
                    disabled={!displayName || !email || !password || !confirmPassword || (password !== confirmPassword)}
                >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;