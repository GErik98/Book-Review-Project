const express = require('express')
const {
    newReview,
    getReviews,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// CREATE new review for a specific book
router.post('/books/:bookId/reviews', requireAuth('user'), newReview);

// GET all reviews for a specific book
router.get('/books/:bookId/reviews', getReviews);

// UPDATE a review
router.patch('/reviews/:id', requireAuth('user'), updateReview);

// DELETE a review
router.delete('/reviews/:id', requireAuth('user'), deleteReview);

module.exports = router