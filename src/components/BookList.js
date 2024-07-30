import React from 'react';
import '../App.css'; // Import the CSS file for BookList

function BookList({ books }) {
    return (
        <div className="book-list">
            {books.map(book => (
                <div className="book-item" key={book.bookId}>
                    <img src={book.image} alt={book.name} />
                    <div className="book-details">
                        <h2>{book.name} </h2>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <h4>BookId : {book.bookId}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;
