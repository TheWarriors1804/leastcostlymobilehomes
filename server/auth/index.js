const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}, include: [{ all: true }]})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        //add localStorage to db here
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

//correctPassword is a prototypal method that hashes the submitted password & compares it to the one in db
//Passport creates a login function on req; when the login process is complete, req.user is set to user

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

//Looks like it is possible to use the route above to send user data to client side.

router.use('/google', require('./google'))

