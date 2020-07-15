const passport = require('passport'),
  jwt = require('jsonwebtoken'),
  Router = require('express').Router(),
  cloudinary = require('cloudinary').v2,
  multer = require('multer')

const Middleware = require('../config/middleware'),
  User = require('../models/user')

var upload = multer({ storage: multer.diskStorage(Middleware.storage), fileFilter: Middleware.imageFilter })
cloudinary.config(Middleware.opts)

Router.post('/register', upload.single('avatarId'), async (req, res, next) => {
  if (req.body.checkUsername) {
    const username = await User.findOne({ username: req.body.checkUsername })
    if (username) {
      return res.json({ available: false })
    }
    return res.json({ available: true })
  }

  const usrEmail = await User.findOne({ email: req.body.email })
  if (usrEmail) { return res.json({ msg: 'User already exists' }) }
  const usrUsername = await User.findOne({ username: req.body.username })
  if (usrUsername) { return res.json({ msg: 'Username is taken' }) }
  try {
    if (req.file) {
      let result = await cloudinary.uploader.upload(req.file.path, { folder: process.env.USERIMAGEDIRECTORY })
      req.body.avatarId = result.public_id
      req.body.avatarURL = result.secure_url
    }
    passport.authenticate('register', { session: false }, (err, user, info) => {
      if (!user) {
        return res.send({ msg: info.message })
      }
      const token = jwt.sign({ user: user }, process.env.STRONG_SECRET)
      res.send({ id_token: token, msg: info.message })
    })(req, res, next)

  } catch (err) {
    console.log(err);
    res.json({ msg: 'Failed to register user' })
  }
})

Router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) { console.log(err) }
    if (!user) { return res.send({ msg: info.message }) }
    const token = jwt.sign({ user: user }, process.env.STRONG_SECRET, { expiresIn: 60 * 60 })
    // client alread added to the begging of token schema 'JWT token ... '
    res.send({ id_token: token, msg: info.message })
  })(req, res, next)
})

Router.get('/profile', (req, res) => {
  res.json({ msg: 'made it to secure route' })
})

module.exports = Router