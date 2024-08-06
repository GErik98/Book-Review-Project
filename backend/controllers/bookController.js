const Book = require('../models/bookModel')
const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

// create a new book
const newBook = async (req, res) => {
    const {title, author, description, averageRating} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!author) {
        emptyFields.push('author')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(description.length < 10) {
        emptyFields.push('descriptionMin')
    }
    if(emptyFields.length > 0) {
        if(emptyFields.includes('descriptionMin') && emptyFields.length < 2){
            return res.status(400).json({ error: 'Description should be at least 10 characters long', emptyFields})
        }
        else {
            return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
        } 
    }
    try {
        const book = await Book.create({title, author, description, averageRating})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1})

    res.status(200).json(books)
}
// get a book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const book = await Book.findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'email'
        }
      })
      .exec();

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update a book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }

    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!book) {
        return res.status(404).json({ message: 'Book not found' })
    }

    res.status(200).json(book)
}

// delete a book
const deleteBook = async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Delete the book
      const book = await Book.findByIdAndDelete(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Delete associated reviews
      await Review.deleteMany({ book: bookId });
  
      res.status(200).json({ message: 'Book and associated reviews deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


module.exports = {
    newBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}