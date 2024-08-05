import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { SIGNUP_URL } from '../constants.js';
import { useAuth } from './AuthContext';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(SIGNUP_URL, { firstName, lastName, email, password });
            console.log(response);
            localStorage.setItem('token', response.data.token);
            login();
            setMessage(response.data.message);
            setTimeout(() => navigate('/booklibrary'), 2000);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignUp;
