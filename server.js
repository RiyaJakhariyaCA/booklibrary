const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'SARP';

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

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Routes for books
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

// Routes for user authentication
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json(err);
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
