const User = require('../models/user'),
    localStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

const strategies = {}

strategies.registerStrategy = new localStrategy(
    { passReqToCallback: true }, async (req, username, password, done) => {
        const newUser = new User({
            username: username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatarId: req.body.avatarId,
            avatarURL: req.body.avatarURL,
            email: req.body.email,
            password: password
        })
        try {
            const user = await User.create(newUser)
            user.password = undefined
            done(null, user, {message: 'user Logged successfully'})
        }
        catch (err) {
            done(null, false, { message: 'User already exist' })
        }
    })


strategies.loginStrategy = new localStrategy(
    { passReqToCallback: true }, async (req, username, password, done) => {
        var criteria = (username.indexOf('@') === -1) ? { username: username } : { email: username }
        try {
            const user = await User.findOne(criteria).select("+password")
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
            const validatePassword = await user.isValidPassword(password)
            if (!validatePassword) {
                return done(null, false, {message: 'Invalid password'})
            }
            user.password = undefined
            done(null, user, {message: 'user Logged successfully'})
        }
        catch (err) {
            return done (err)
        }
    }
)

const opts = {jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), secretOrKey : process.env.STRONG_SECRET}

strategies.secureRoute = new JwtStrategy(opts, async(jwt_payload, done) => {
    done(null, jwt_payload.user)
})

module.exports = strategies