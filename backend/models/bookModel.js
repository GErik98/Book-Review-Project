const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, minLength: [10, 'A leírásnkal legalább 10 karakter hosszúnak kell lennie.'] },
    averageRating: { type: Number, default: 0},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
}, { timestamps: true})

module.exports = mongoose.model('Book', bookSchema)