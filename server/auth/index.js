const router = require('express').Router()
const User = require('../db/models/user')
const {Order} = require('../db/models/index')
const {Product} = require('../db/models/index')
const {OrderItem} = require('../db/models/index')
module.exports = router

router.post('/login', (req, res, next) => {
  console.log('REQ', req.body, req)
  User.findOne({
    where: {email: req.body.email},
    include: [{all: true, nested: true}]
  })
    .then(async user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        console.log('I AM IN THE RIGHT ROUTE', req.body)
        //add localStorage to db here
        // const cart = localStorage.cart
        const cart = req.body.cart
        const userorder = await Order.findAll({
          where: {userId: user.id, complete: false},
          include: [{model: Product}]
        })
        console.log('tried to find the users order', userorder)
        if (!userorder[0]) {
          const neworder = await Order.create({
            userId: user.id,
            complete: false
          })
          console.log('user had no order, creating order', cart)
          for (var key in cart) {
            console.log('key is', key)
            await OrderItem.create({
              productId: key,
              orderId: neworder.id,
              quantity: cart[key]
            })
          }
        } else {
          for (const id in cart) {
            let flag = false
            userorder[0].dataValues.products.forEach(async product => {
              if (id == product.dataValues.id) {
                flag = true
                const userorderitem = await OrderItem.findAll({
                  where: {
                    orderId: userorder[0].id,
                    productId: product.dataValues.id
                  }
                })
                const updated = await userorderitem[0].update({
                  quantity: cart[id]
                })
              }
            })
            if (flag === false) {
              const neworderitem = await OrderItem.create({
                orderId: userorder[0].id,
                productId: id,
                quantity: cart[id]
              })
            }
          }
        }
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
