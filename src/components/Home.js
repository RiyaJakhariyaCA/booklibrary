import React,{useEffect,useState} from 'react';
import '../App.css'
import BookList from './BookList';
import axios from "axios";
import {READ_URL} from '../constants.js'
function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(READ_URL)
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="home-container">
            <h1>Book Library</h1>
            <BookList books={books} />
        </div>
    );
}

export default Home;
