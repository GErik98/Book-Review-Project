const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Create a new review
const newReview = async (req, res) => {
  const { bookId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(404).json({ error: 'Book or User not found' });
    }

    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    await review.save();

    // Add the review to the book's reviews array
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews for a book
const getReviews = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId }).populate('user', 'username');

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
