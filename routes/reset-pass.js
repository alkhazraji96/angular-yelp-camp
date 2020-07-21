const Router = require('express').Router(),
  nodemailer = require('nodemailer'),
  crypto = require('crypto'),
  async = require('async'),
  User = require('../models/user')

Router.post('/api/reset-password', (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        var token = buf.toString('hex')
        done(err, token)
      })
    },
    (token, done) => {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
          return res.json({ success: false, msg: 'No account with that email address exists.' })
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save((err) => {
          done(err, token, user);
        })
      })
    },
    (token, user, done) => {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAILUN,
          pass: process.env.GMAILPW
        }
      })
      var mailOptions = {
        to: user.email,
        from: 'YelpCamp Community',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset-password/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
      smtpTransport.sendMail(mailOptions, (err) => {
        done(err, 'done')
        res.json({ success: true, msg: 'Reset password Email sent succeccfully' })
      })
    }
  ], (err) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to reset password' })
      return next(err);
    }
  })
})

Router.get('/api/reset-password/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      return res.json({ success: false, msg: 'Password reset token is invalid or has expired.' })
    }
    return res.json({ success: true, token: req.params.token })
  })
})

Router.post('/api/reset-password/:token', (req, res) => {
  async.waterfall([
    (done) => {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
          return res.json({ success: false, msg: 'Password reset token is invalid or has expired.' })
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save((err) => {
          done(err, user)
        })
      })
    },
    (user, done) => {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAILUN,
          pass: process.env.GMAILPW
        }
      })
      var mailOptions = {
        to: user.email,
        from: 'YelpCamp Community',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, (err) => {
        res.json({ success: true, msg: 'Your password has been changed.' });
        done(err);
      })
    }
  ], (err) => {
    res.json({ success: false, msg: 'Failed to reset password' })
  })
})


module.exports = Router
