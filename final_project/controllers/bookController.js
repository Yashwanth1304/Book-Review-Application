// controllers/bookController.js
const Book = require('../models/book');

// Add a new book
const addBook = async (req, res) => {
    const { isbn, title, author } = req.body;

    try {
        const newBook = new Book({ isbn, title, author, reviews: {} });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

// Get book by ISBN
const getBookByIsbn = async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await Book.findOne({ isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await Book.findOneAndDelete({ isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};

module.exports = { addBook, getBooks, getBookByIsbn, deleteBook };
