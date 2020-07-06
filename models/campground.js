const mongoose = require('mongoose')

CampgroundSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    imageId: { type: String },
    imageURL: { type: String },
    description: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },
    createdAt: { type: Date, default: Date.now  },
})

module.exports = mongoose.model('Campground', CampgroundSchema)