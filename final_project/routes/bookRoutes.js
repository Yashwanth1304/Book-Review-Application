// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/books', authMiddleware, bookController.addBook);
router.get('/books', bookController.getBooks);  // Get all books
router.get('/books/:isbn', bookController.getBookByIsbn);
router.delete('/books/:isbn', authMiddleware, bookController.deleteBook);

module.exports = router;
