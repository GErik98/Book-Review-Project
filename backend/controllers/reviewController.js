const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Create a new review
const newReview = async (req, res) => {
  const { bookId } = req.params;
  const { userId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid Book ID' });
    }

  try {
    const review = new Review({ rating, comment, user: userId, book: bookId });
    await review.save();

    const book = await Book.findById(bookId);
    book.reviews.push(review._id);

    const reviews = await Review.find({ book: bookId });
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    book.averageRating = averageRating;

    await book.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a book
const getReviews = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId }).populate('user', 'email');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the user is the owner or an admin
    if (review.user.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the user is the owner or an admin
    if (review.user.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await review.remove();

    // Remove the review from the book's reviews array
    const book = await Book.findById(review.book);
    if (book) {
      book.reviews = book.reviews.filter((revId) => revId.toString() !== id);
      await book.save();
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  newReview,
  getReviews,
  updateReview,
  deleteReview
};
