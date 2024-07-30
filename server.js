const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const db = 'mongodb+srv://junkuser:abc@testdummy.8xodcfs.mongodb.net/bookschema';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Book Schema
const BookSchema = new mongoose.Schema({
    bookId: { type: Number, unique: true, required: true },
    name: String,
    author: String,
    genre: String,
    image: String
});

const Book = mongoose.model('Book', BookSchema);

// Routes
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/api/books', async (req, res) => {
    const { bookId, name, author, genre, image } = req.body;
    try {
        const book = new Book({ bookId, name, author, genre, image });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Book ID already exists. Please add another ID.' });
        } else {
            res.status(500).json(err);
        }
    }
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findOne({ bookId: req.params.id });
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.put('/api/books/:id', async (req, res) => {
    const { name, author, genre, image } = req.body;
    const book = await Book.findOneAndUpdate({ bookId: req.params.id }, { name, author, genre, image }, { new: true });
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    const book = await Book.findOneAndDelete({ bookId: req.params.id });
    if (book) {
        res.json({ message: 'Book deleted' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
