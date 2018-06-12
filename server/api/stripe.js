const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_CLIENT_ID)

router.post('/', async (req, res, next) => {
  try {
    const {token} = req.body
    const newCharge = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'ok',
      source: token
    })
    res.json(newCharge)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
