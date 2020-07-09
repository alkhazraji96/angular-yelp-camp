const mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5 },
    text: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    campground: { type: mongoose.Schema.Types.ObjectId, ref: 'Campground' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Review", reviewSchema);