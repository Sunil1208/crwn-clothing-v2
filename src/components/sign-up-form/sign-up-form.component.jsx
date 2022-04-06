import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

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
            console.log("repsonse in sign up is ", user);
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
        <div>
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

                <button 
                    type='submit'
                    disabled={!displayName || !email || !password || !confirmPassword || (password !== confirmPassword)}
                >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;