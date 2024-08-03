require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const books = require('./routes/books')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/books/', books)
app.use('/api/', reviews)
app.use('/api/users/', users)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port 4000!')
})
    })
    .catch((error) => {
        console.error(error)
    })


