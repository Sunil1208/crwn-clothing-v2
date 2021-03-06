import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
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
            dispatch(signUpStart(email, password, displayName));
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
        <SignUpContainer >
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
        </SignUpContainer>
    )
}

export default SignUpForm;