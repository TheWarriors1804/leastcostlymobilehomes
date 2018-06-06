const router = require('express').Router();
const { Order, Product } = require('../db/models');
module.exports = router;

// get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ all: true }]
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// get solo product
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const newProduct = await Product.find({
      where: {
        id
      },
      include: [{ all: true }]
    });
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});
