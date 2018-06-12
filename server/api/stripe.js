const router = require('express').Router()
const stripe = require('stripe')('sk_test_zkwLj0ec90vCHNOxjvQny1fc')

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
