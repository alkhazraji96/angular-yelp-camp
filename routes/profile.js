    const Router = require('express').Router()

    const User = require('../models/user'),
    Campground = require('../models/campground')

Router.get('/users/:slug', async (req, res) => {
    const user = await User.findOne({slug: req.params.slug})
    if (!user) { return res.json({msg: 'User not found'}) }
    const campgrounds = await Campground.find().where('author').equals(user._id).exec()
    console.log(campgrounds);
    
    res.json({campgrounds: campgrounds, user: user})
})


module.exports = Router