// routes/general.js
const express = require('express');
const public_users = express.Router();
const Book = require('../models/book');

// GET all books
public_users.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Retrieve all books from the database
        res.status(200).json(books); // Return the list of books
    } catch (error) {
        res.status(500).send({ message: 'Error fetching books list' });
    }
});

// Export the router
module.exports.general = public_users;
