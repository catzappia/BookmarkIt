import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import stylesheet
import Auth from '../utils/auth';
// import { login } from '../../utils/API';
import { useMutation } from '@apollo/client';
import { SignUpFormData } from '../models/signUpFormData';
import { ADD_USER } from '../utils/mutations';
import '../styles/signup.css';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // error state
    const [error, setError] = useState<string | null>(null);

    const [addUser] = useMutation(ADD_USER);

    // handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await addUser({ variables: { input: { ...formData } } });
            
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            else {
                const result = await login(formData.email, formData.password);
                if (result.ok) {
                    Auth.login(result.token);
                }
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="main">
            <div className="signup-container">
            <h2>Sign Up</h2>

            <form onSubmit={handleFormSubmit}>
                <div className="signup-form">
                <div className="input-field">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInputChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleInputChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleInputChange} />
                </div>
                </div>
                <button type="submit" className="signup-btn">Submit</button>
                <p className="existing-user">Already have an account? <Link to="/login>">Sign In</Link></p>
            </form>
        <div className="error-messages">
            {error && (
                <div>
                    {error}
                </div>
            )}
        </div>
        </div>
        </div>
    )
}

// export default SignUp;