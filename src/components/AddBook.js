import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file for styling
import { useNavigate, useParams } from 'react-router-dom';
import {READ_URL} from '../constants.js'

function AddBook() {
    const [bookId, setBookId] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(READ_URL, {
                bookId, name, author, genre, image
            });
            setMessage('Book added successfully');
            setTimeout(() => navigate('/booklibrary'), 2000); 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('Book ID already exists. Please add another ID.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="add-book-container">
            <h1>Add a Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Book ID"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Book Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Genre Name"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Book Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <button type="submit">Add Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddBook;
