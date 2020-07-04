const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    Router = require('express').Router()

Router.post('/register', (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (!user) {
            return res.send({ msg: info.message })
        }
        const token = jwt.sign({ id: user._id }, process.env.STRONG_SECRET)
        res.send({ id_token: token, user: user, msg: info.message })
    })(req, res, next)    
})

Router.post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {console.log(err)}
        if (!user) { return res.send({ msg: info.message }) }
        const token = jwt.sign({ id: user._id }, process.env.STRONG_SECRET, { expiresIn: 60 * 60 })
        // client alread added to the begging of token schema 'JWT token ... '
        res.send({ id_token: token, user: user, msg: info.message })
    })(req, res, next)
})

Router.get('/profile', (req, res) => {
    res.json({ msg: 'made it to secure route' })
})

module.exports = Router