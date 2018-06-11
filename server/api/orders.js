const router = require('express').Router()
const {Order, Product, User, OrderItem} = require('../db/models/index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get all the orders for the user
router.get('/:userid', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userid}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get all the products in the user's cart
router.get('/cart/:userid', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userid,
        complete: false
      },
      include: [{model: Product}]
    })
    const cart = {}
    order[0].products.map(product => {
      const id = product.id
      const value = product.orderItem.quantity
      cart[id] = value
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//when no one is logged in, this post route creates a new order in the orders table on checkout.  the session id and order items will be pased through the req.body. status should be 'complete in req.body. each item id should be kept in an array on req.body.items
router.post('/', async (req, res, next) => {
  const target = req.body
  try {
    const makeorder = await Order.create({
      sessionId: 'test4',
      complete: true
    })
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        const makeorderid = makeorder.dataValues.id

        const orderitem = await OrderItem.create({
          orderId: makeorderid,
          productId: key,
          quantity: target[key]
        })
      }
    }
    res.json(makeorder)
  } catch (err) {
    next(err)
  }
})

//when the user is logged in, this post route is used to create the order for the user and add products to the order
router.post('/:userid/:productid', async (req, res, next) => {
  console.log('in the route', req.body.quantity)
  const quantity = req.body.quantity
  try {
    const neworder = await Order.findOrCreate({
      where: {userId: req.params.userid, complete: false}
    })
    const newproduct = await Product.findById(req.params.productid)
    const association = await Order.findAll({
      where: {id: neworder[0].id},
      include: [
        {
          model: Product,
          through: {
            where: {
              productId: req.params.productid
            }
          }
        }
      ]
    })
    console.log('reached here')
    if (association[0].products[0]) {
      const orderitem = await OrderItem.findAll({
        where: {
          orderId: neworder[0].id,
          productId: newproduct.id
        }
      })
      if (orderitem[0]) {
        const updatedorderitem = await orderitem[0].update({
          quantity: quantity
        })
        res.json(updatedorderitem)
      } else {
        const neworderitem = await OrderItem.create({
          orderId: neworder[0].id, productId: newproduct.id, quantity: quantity
        })
        res.json(neworderitem)
      }
      // const count = orderitem[0].quantity;
    } else {
      const neworderitem = await OrderItem.create({
        orderId: neworder[0].id, productId: newproduct.id, quantity: quantity
      })
      res.json(neworderitem)
    }
  } catch (err) {
    next(err)
  }
})

//when the user is logged in, this put route is used to change the order status to complete at checkout

router.put('/:userid', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userid, complete: false}
    })
    const updatedorder = await order[0].update({complete: true})
    res.json(updatedorder)
  } catch (err) {
    next(err)
  }
})

//this route allows logged in users to clear their cart
router.delete('/:userid', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userid, complete: false}
    })
    await order[0].destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

//this route allows logged in users to remove an item from their cart
router.delete('/:userid/:productid', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userid, complete: false}
    })
    const item = await OrderItem.findAll({
      where: {orderId: order[0].id, productId: req.params.productid}
    })
    await item[0].destroy()
    res.status(204).end()
  } catch(err) {
    next(err)
  }
})
