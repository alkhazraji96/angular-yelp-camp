require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport')

const strategies = require('./config/strategies'),
    authRoutes = require('./routes/auth'),
    campgroundRoute = require('./routes/campground')
    profileRoute = require('./routes/profile')

const app = express()

const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
mongoose.connect('mongodb://localhost/yelpcamp_mean', options)

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
      next()
    })
    
app.use(passport.initialize())
app.use(bodyParser.json())
passport.use('register', strategies.registerStrategy)
passport.use('login', strategies.loginStrategy)
passport.use('jwt', strategies.secureRoute)

app.use(authRoutes)
app.use(campgroundRoute)
app.use(profileRoute)

app.listen(process.env.PORT, () => console.log(`server is running at ${process.env.PORT}`))
