const Router = require('express').Router(),
    passport = require('passport')

const User = require('../models/user'),
    Campground = require('../models/campground')
Review = require('../models/review')

Router.post('/campgrounds/:slug/review', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const checkReview = await Review.findOne({ author: req.user._id })
        if (checkReview) { return res.json({msg: 'You can submit review only once!', success: false})}
        var campground = await Campground.findOne({ slug: req.params.slug }).populate('reviews').exec()
        newReview = new Review({
            text: req.body.text,
            rating: req.body.rating,
            author: req.user._id,
            campgound: campground._id
        })
        var review = await Review.create(newReview)
        await campground.reviews.push(review)
        campground.rating = calculateAverage(campground.reviews)
        await campground.save()
        res.json({ msg: 'Review successfully added' })
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Failed to add review', success: false})
    }
})

module.exports = Router

function calculateAverage(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return sum / reviews.length;
}