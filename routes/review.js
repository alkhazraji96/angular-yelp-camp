const Router = require('express').Router(),
    passport = require('passport')

    Campground = require('../models/campground')
const middlewareObj = require('../config/middleware')
Review = require('../models/review')

Router.post('/api/campgrounds/:slug/review', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const campground = await Campground.findOne({ slug: req.params.slug }).populate('reviews').exec()
      const userReview = campground.reviews.some((review) => {return review.author.equals(req.user._id)})
        if (userReview) { return res.json({ msg: 'You can submit a review only once!', success: false }) }
        if (campground.author == req.user._id) { return res.json({ msg: 'You cannot submit a review on your own post', success: false }) }
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
        res.json({ msg: 'Review successfully added', success: true })
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Failed to add review', success: false })
    }
})

Router.get("/api/campgrounds/:slug/review/:review_id/edit", passport.authenticate('jwt', { session: false }), middlewareObj.cros, async function (req, res) {
    const review = await Review.findOne({ _id: req.params.review_id })
    res.json({ review: review })
})

Router.put("/api/campgrounds/:slug/review/:review_id", passport.authenticate('jwt', { session: false }), middlewareObj.cros, async function (req, res) {

    try {
        const review = await Review.findOne({ _id: req.params.review_id })
        review.text = req.body.text
        review.rating = req.body.rating
        const updatedReview = await review.save()
        const campground = await Campground.findOne({ slug: req.params.slug }).populate('reviews').exec()
        campground.rating = calculateAverage(campground.reviews)
        await campground.save()
        res.json({ review: updatedReview, success: true })
    } catch (err) {
        console.log(err);
        res.json({ success: false })
    }
})

Router.delete("/api/campgrounds/:slug/review/:review_id", passport.authenticate('jwt', { session: false }), middlewareObj.cros, async function (req, res) {
    try {
        await Review.findByIdAndRemove(req.params.review_id)
        const campgound = await Campground.findOne({ slug: req.params.slug }).populate('reviews').exec()
        campgound.reviews.pull(req.params.review_id)
        campgound.save()
        res.json({ success: true })
    } catch (err) {
        res.json({ success: false })
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