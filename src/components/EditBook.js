import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'; // Import the same CSS file as AddBook
import {READ_URL} from '../constants.js'
function EditBook() {
    const { bookId } = useParams();
    const [book, setBook] = useState({ name: '', author: '', genre: '', image: '' });
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${READ_URL}${bookId}`);
                setBook(response.data);
                setImageUrl(response.data.image);
            } catch (error) {
                setMessage('Failed to fetch book details');
            }
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
        if (name === 'image') {
            setImageUrl(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure the full URL is sent to the backend
            const updatedBook = {
                ...book,
                image: imageUrl
            };
            await axios.put(`${READ_URL}${bookId}`, updatedBook);
            setMessage('Book updated successfully');
            setTimeout(() => navigate('/booklibrary'), 2000); // Redirect to Home after 2 seconds
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    const extractFileName = (url) => {
        return url.split('/').pop();
    };

    return (
        <div className="add-book-container">
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    value={book.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre Name"
                    value={book.genre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Book Image URL"
                    value={extractFileName(imageUrl)}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Book</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default EditBook;
