const Campground = require("../models/campground")

var middlewareObj = {}

middlewareObj.storage = {
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now())
    }
}

middlewareObj.imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

middlewareObj.opts = {
    cloud_name: 'alkhz',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

middlewareObj.ccgos = async (req, res, next) => {
    try {
        const foundCampground = await Campground.findOne({ slug: req.params.slug })
        if (!foundCampground.author.equals(req.user._id)) {
            return res.json({ msg: 'Sorry, you are not the author!' })
        }
        next()
    } catch (err) {
        res.json({ msg: 'campground not found' })
    }
}

middlewareObj.cros = async (req, res, next) => {
    try {
        const foundReview = await Review.findOne({_id: req.params.review_id})
        if (!foundReview.author.equals(req.user._id)) {
            return res.json({ msg: 'Sorry, you are not the author!' })
        }
        next()
    } catch (err) {
        console.log(err);
        
        res.json({ msg: 'cannot access secure route' })
    }
}

module.exports = middlewareObj