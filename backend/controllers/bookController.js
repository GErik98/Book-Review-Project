const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// create a new book
const newBook = async (req, res) => {
    const {title, author, description, avarageRating} = req.body

    // add doc to db
    try {
        const book = await Book.create({title, author, description, avarageRating})
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
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' })  // if the id is not a valid ObjectId, return an error message.
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json(book)
}
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
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }

    const book = await Book.findOneAndDelete({_id: id})

    if (!book) {
        return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json({ message: 'Book deleted successfully' })
}


module.exports = {
    newBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}