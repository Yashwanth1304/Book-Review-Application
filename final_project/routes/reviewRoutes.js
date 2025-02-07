// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/reviews/:isbn', authMiddleware, reviewController.addReview);
router.delete('/reviews/:isbn', authMiddleware, reviewController.deleteReview);

module.exports = router;
