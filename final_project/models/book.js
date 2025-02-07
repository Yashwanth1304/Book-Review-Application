const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    reviews: { type: Map, of: String, default: {} }, // Reviews stored by username
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
