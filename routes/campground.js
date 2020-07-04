const Router = require('express').Router()

const Campground = require('../models/campground')

Router.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({})
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        res.json({ msg: 'Failed to retreive campgrounds' })
    }
})

Router.post('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.create(req.body.campground)
        res.json({ campgrounds: campgrounds })
        res.json({ msg: 'reveived' })
    }
    catch (err) {
        res.json({ msg: 'Failed to create campground' })
    }
})

Router.get('/campgrounds:id', async (req, res) => {
    try {
        const campgrounds = await Campground.find({_id: req.params.id})
        res.json({ campgrounds: campgrounds })
    }
    catch (err) {
        res.json({ msg: 'Failed to retreive campgrounds' })
    }
})


module.exports = Router