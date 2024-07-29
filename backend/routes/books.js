const express = require('express')

const router = express.Router()

// CREATE a new book
router.post('/books', (req, res) => {
    res.json({mssg: 'CREATE new book'})
})

// GET all books
router.get('/books', (req, res) => {
    res.json({mssg: 'GET all books'})
})

// GET a book
router.get('/books/:id', (req, res) => {
    res.json({mssg: 'GET one book'})
})

// UPDATE a book
router.patch('/books/:id', (req, res) => {
    res.json({mssg: 'UPDATE one book'})    
})

// DELETE a book
router.delete('/books/:id', (req, res) => {
    res.json({mssg: 'DELETE one book'})
})


module.exports = router