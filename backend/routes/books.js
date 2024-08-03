const express = require('express')
const {
    newBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


// CREATE a new book
router.post('/', newBook)

// GET all books
router.get('/', getBooks)

// GET a book
router.get('/:id', getBook)

// UPDATE a book
router.patch('/:id', requireAuth('admin'), updateBook)

// DELETE a book
router.delete('/:id', requireAuth('admin'), deleteBook)


module.exports = router