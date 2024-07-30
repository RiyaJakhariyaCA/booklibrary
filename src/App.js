import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import './App.css'; // Import the CSS file
import EditBook from './components/EditBook';
function App() {
    return (
        <Router>
            <div>
                <header>
                <div className="logo">
                            <img src="https://resumeriya.s3.ap-south-1.amazonaws.com/book1.jpg" alt="Book Library Logo" />
                    </div>
                    <nav>
                        <Link to="/booklibrary">Home</Link>
                        <Link to="/add">Add</Link>
                        <Link to="/search">Search</Link>
                    </nav>
                   
                </header>
                <main>
                    <Routes>
                        <Route path="/booklibrary" element={<Home />} />
                        <Route path="/add" element={<AddBook />} />
                        <Route path="/search" element={<SearchBook />} />
                        <Route path="/edit/:bookId" element={<EditBook />} /> {/* Add route for EditBook */}
                    </Routes>
                </main>
                <footer>
                    <p>© 2024 Book Library. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
