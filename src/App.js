import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EditBook from './components/EditBook';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <header>
                        <div className="logo">
                            <img src="https://resumeriya.s3.ap-south-1.amazonaws.com/book1.jpg" alt="Book Library Logo" />
                        </div>
                        <nav>
                            <Link to="/booklibrary">Home</Link>
                            <ProtectedLink to="/add">Add</ProtectedLink>
                            <ProtectedLink to="/search">Search</ProtectedLink>
                            <AuthLinks />
                        </nav>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/booklibrary" element={<Home />} />
                            <Route path="/add" element={<AddBook />} />
                            <Route path="/search" element={<SearchBook />} />
                            <Route path="/edit/:bookId" element={<EditBook />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                    <footer>
                        <p>© 2024 Book Library. All rights reserved.</p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

function AuthLinks() {
    const { isAuthenticated, logout } = useAuth();

    return isAuthenticated ? (
        <button className="logout-button" onClick={logout}>Logout</button>
    ) : (
        <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
        </>
    );
}

function ProtectedLink({ to, children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Link to={to}>{children}</Link> : null;
}

export default App;
