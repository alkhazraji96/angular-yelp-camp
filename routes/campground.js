const Router = require('express').Router(),
    cloudinary = require('cloudinary').v2,
    multer = require('multer')

const Middleware = require('../config/middleware'),
    Campground = require('../models/campground')
Review = require('../models/review')
const passport = require('passport')
const middlewareObj = require('../config/middleware')

var upload = multer({ storage: multer.diskStorage(Middleware.storage), fileFilter: Middleware.imageFilter })

cloudinary.config(Middleware.opts)


Router.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({}).populate({ path: 'reviews', populate: { path: 'author', model: 'User' } }).exec()
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        res.json({ msg: 'Failed to retreive campgrounds' })
    }
})

Router.post('/campgrounds', passport.authenticate('jwt', { session: false }), upload.single('imageId'), async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.file.path, { folder: process.env.CAMPGROUNDIMAGEDIRECTORY })
        req.body.imageId = result.public_id
        req.body.imageURL = result.secure_url
        req.body.author = req.user._id
        const campgrounds = await Campground.create(req.body)
        res.json({ campgrounds: campgrounds, msg: 'Campground Created Successfully' })
    }
    catch (err) {
        res.json({ msg: 'Failed to create campground' })
    }
})

Router.get('/campgrounds:slug', async (req, res) => {
    try {
        const campgrounds = await Campground.find({ slug: req.params.slug }).populate('author').exec()
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        res.json({ msg: 'Failed to retreive campgrounds' })
    }
})

Router.put('/campgrounds:slug', passport.authenticate('jwt', { session: false }), upload.single('imageId'), async (req, res) => {
    try {
        const campground = await Campground.findOne({ slug: req.params.slug }).populate('author').exec()
        if (req.user._id != campground.author._id) { return res.json({ msg: 'Sorry, you are not the author!' }) }
        if (req.file) {
            await cloudinary.uploader.destroy(campground.imageId)
            const result = await cloudinary.uploader.upload(req.file.path, { folder: process.env.CAMPGROUNDIMAGEDIRECTORY })
            campground.imageId = result.public_id
            campground.imageURL = result.secure_url
        }
        campground.title = req.body.title
        campground.description = req.body.description
        campground.price = req.body.price
        const updatedCamp = await campground.save()
        res.json({ campground: updatedCamp, msg: 'Campground updated successfully' })
    } catch (err) {
        res.json({ msg: 'Failed to update the campground' })
    }
})

Router.delete('/campgrounds:slug', passport.authenticate('jwt', { session: false }), middlewareObj.ccgos, upload.single('imageId'), async (req, res) => {
    try {
        var campground = await Campground.findOne({ slug: req.params.slug })
        await cloudinary.uploader.destroy(campground.imageId)
        await Review.deleteMany({ "_id": { $in: campground.reviews } })
        await campground.deleteOne()
        res.json({ msg: 'Campground deleted successfully', success: true })
    } catch (err) {
        res.json({ msg: 'Failed to delete the campground', success: false })
    }
})


module.exports = Router