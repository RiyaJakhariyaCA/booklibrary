import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { LOGIN_URL } from '../constants.js';
import { useAuth } from './AuthContext'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, { email, password });
            localStorage.setItem('token', response.data.token);
            login();
            navigate('/booklibrary');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
