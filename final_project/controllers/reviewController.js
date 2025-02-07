// controllers/reviewController.js
const Book = require('../models/book');

// Add or update a review for a book
const addReview = async (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.username; // Set by the authMiddleware

    if (!review) {
        return res.status(400).json({ message: 'Review is required' });
    }

    try {
        const book = await Book.findOne({ isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Add or update the review for the current user
        book.reviews.set(username, review);
        await book.save();

        res.status(200).json({ message: 'Review added/updated successfully', reviews: book.reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error adding/updating review', error: error.message });
    }
};

// Delete a review for a book
const deleteReview = async (req, res) => {
    const { isbn } = req.params;
    const username = req.username; // Set by the authMiddleware

    try {
        const book = await Book.findOne({ isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check if the review exists for the user before deleting
        if (!book.reviews.has(username)) return res.status(404).json({ message: 'Review not found' });

        book.reviews.delete(username);
        await book.save();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};

module.exports = { addReview, deleteReview };
