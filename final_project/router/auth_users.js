const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

const SECRET_KEY = 'fingerprint_customer';

// Helper to find user
const findUser = async (username) => await User.findOne({ username });

// Register a new user
regd_users.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required!' });
    }

    const userExists = await findUser(username);
    if (userExists) {
        return res.status(400).send({ message: 'Username already exists!' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully!' });
});

// Login a user
regd_users.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required!' });
    }

    const user = await findUser(username);
    if (!user || user.password !== password) {
        return res.status(401).send({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful!', token });
});

// Middleware to check for JWT token (authentication)
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid token!' });
        }
        req.username = decoded.username;
        next();
    });
};

// Add a new book (POST)
regd_users.post('/book', checkAuth, async (req, res) => {
    const { isbn, title, author } = req.body;

    if (!isbn || !title || !author) {
        return res.status(400).send({ message: 'ISBN, title, and author are required!' });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
        return res.status(400).send({ message: 'Book already exists with this ISBN!' });
    }

    const newBook = new Book({ isbn, title, author, reviews: {} });
    await newBook.save();

    res.status(201).send({ message: 'Book added successfully!', book: newBook });
});

// Add or modify a book review (PUT)
regd_users.put('/review/:isbn', checkAuth, async (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.username;

    // Validate that review data is present
    if (!review) {
        return res.status(400).send({ message: 'Review text is required!' });
    }

    try {
        // Find the book by ISBN
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).send({ message: 'Book not found!' });
        }

        // Add or update the review for the current user
        book.reviews.set(username, review); // This will either set a new review or update an existing one
        await book.save(); // Save the book document with updated reviews

        // Return success response
        res.status(200).send({ message: 'Review added/updated successfully!', reviews: book.reviews });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating the review!' });
    }
});

// Delete a book (DELETE)
regd_users.delete('/book/:isbn', checkAuth, async (req, res) => {
    const { isbn } = req.params;

    try {
        // Find the book by ISBN
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).send({ message: 'Book not found!' });
        }

        // Delete the book from the database
        await Book.deleteOne({ isbn });

        // Return success response
        res.status(200).send({ message: 'Book deleted successfully!' });
    } catch (error) {
        console.error('Error during DELETE book operation:', error);
        res.status(500).send({ message: 'Error deleting the book!' });
    }
});


// Delete a book review (DELETE)
regd_users.delete('/review/:isbn', checkAuth, async (req, res) => {
    const { isbn } = req.params;
    const username = req.username;

    try {
        // Find the book by ISBN
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).send({ message: 'Book not found!' });
        }

        // Check if the user has reviewed this book
        if (!book.reviews.has(username)) {
            return res.status(404).send({ message: 'Review not found!' });
        }

        // Delete the review for the current user
        book.reviews.delete(username); // This removes the user's review from the Map
        await book.save(); // Save the book document after deletion

        // Return success response
        res.status(200).send({ message: 'Review deleted successfully!', reviews: book.reviews });
    } catch (error) {
        console.error('Error during DELETE operation:', error);
        res.status(500).send({ message: 'Error deleting the review!' });
    }
});


module.exports.authenticated = regd_users;
