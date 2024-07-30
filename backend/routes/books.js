const express = require('express')
const {
    newBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController')

const router = express.Router()

// CREATE a new book
router.post('/books', newBook)

// GET all books
router.get('/books', getBooks)

// GET a book
router.get('/books/:id', getBook)

// UPDATE a book
router.patch('/books/:id', updateBook)

// DELETE a book
router.delete('/books/:id', deleteBook)


module.exports = router