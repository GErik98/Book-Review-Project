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
router.post('/', newBook)

// GET all books
router.get('/', getBooks)

// GET a book
router.get('/:id', getBook)

// UPDATE a book
router.patch('/:id', updateBook)

// DELETE a book
router.delete('/:id', deleteBook)


module.exports = router