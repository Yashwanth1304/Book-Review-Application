const express = require('express');
const public_users = express.Router();
const Book = require('../models/book');

// Get all books
public_users.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching books list' });
    }
});

// Get book details by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await Book.findOne({ isbn });
        if (!book) throw new Error('Book not found');

        res.status(200).json(book);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    const { author } = req.params;

    try {
        const books = await Book.find({ author: new RegExp(author, 'i') });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching books' });
    }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const books = await Book.find({ title: new RegExp(title, 'i') });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching books' });
    }
});

// Get book reviews by ISBN
public_users.get('/review/:isbn', async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await Book.findOne({ isbn });
        if (!book || !book.reviews) throw new Error('Reviews not found');

        res.status(200).json(book.reviews);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

module.exports.general = public_users;
