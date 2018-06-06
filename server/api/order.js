const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ all: true }],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const newOrder = await Order.findById(req.params.id, {
      include: [{ all: true }],
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const orderList
  } catch (err) {
    next(err)
  }
})
