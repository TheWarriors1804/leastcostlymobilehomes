const router = require('express').Router()
const {Order, Product} = require('../db/models')
// const {Product} = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Order}]
    })
  res.json(products)
  } catch (err)
    {next(err)}
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newProduct = await Product.find({
      where: {
        id
      },
      // include: {model: Product}
    })
    res.json(newProduct)
  } catch (err)
    {next(err)}
})
