import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file for styling
import {READ_URL} from '../constants.js'

function SearchBook() {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${READ_URL}${bookId}`);
      setBook(response.data);
      setMessage('');
    } catch (error) {
      setBook(null);
      setMessage('Book not found');
    }
  };

  const handleUpdate = () => {
    navigate(`/edit/${bookId}`); // Navigate to the EditBook component
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${READ_URL}${bookId}`);
      setBook(null);
      setMessage('Book deleted successfully');
      setTimeout(() => navigate('/booklibrary'), 2000); 
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="search-book-container">
      <h1>Search Book</h1>
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      
      />
      <button onClick={handleSearch}  className="search-button">Search</button>
      {message && <p className="message">{message}</p>}
      {book && (
        <div className="book-details">
          <h2>{book.name}</h2>
          <img src={book.image} alt={book.name} />
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
}

export default SearchBook;
