const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    avarageRating: { type: Number, default: 0}
}, { timestamps: true})

module.exports = mongoose.model('Book', bookSchema)