const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minLength: [10, 'A kommentnek legalább 10 karakter hosszúnak kell lennie.'] }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
