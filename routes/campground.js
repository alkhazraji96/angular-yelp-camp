const Router = require('express').Router(),
    cloudinary = require('cloudinary').v2,
    multer = require('multer')

const Middleware = require('../config/middleware'),
    Campground = require('../models/campground')
const passport = require('passport')

var upload = multer({ storage: multer.diskStorage(Middleware.storage), fileFilter: Middleware.imageFilter })

cloudinary.config(Middleware.opts)


Router.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({})
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
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        console.log(err);
        
        res.json({ msg: 'Failed to create campground' })
    }
})

Router.get('/campgrounds:id', async (req, res) => {
    try {        
        const campgrounds = await Campground.find({ _id: req.params.id }).populate('author').exec()
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        res.json({ msg: 'Failed to retreive campgrounds' })
    }
})


module.exports = Router