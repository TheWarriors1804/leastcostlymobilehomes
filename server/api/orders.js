const router = require("express").Router();
const { Order, Product, User, OrderItem } = require("../db/models/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userid", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userid }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//when no one is logged in, this post route creates a new order in the orders table on checkout.  the session id and order items will be pased through the req.body. status should be 'complete in req.body. each item id should be kept in an array on req.body.items
router.post('/', async (req, res, next) => {
  console.log('req.body', req.body)
  try {
    const order = await Order.create(req.body.session)
    req.body.products.map(async (id) => {
      const product = await Product.findById(id)
      order.addProducts(product);
      product.addOrders(order);
    })
    res.json(order)
  } catch(err) {
    next(err)
  }
})

//when the user is logged in, this post route is used to create the order for the user and add products to the order
router.post("/:userid/:productid", async (req, res, next) => {
  try {
    const neworder = await Order.findOrCreate({
      where: { userId: req.params.userid, status: "incomplete" },
      defaults: { status: "incomplete", sessionId: "asdf" }
    });
    const newproduct = await Product.findById(req.params.productid);
    const association = await Order.findAll({
      where: { id: neworder[0].id },
      include: [
        { model: Product, through: {
          where: {
            productId: req.params.productid
          }
        } }
      ]
    });
    if(association[0].products[0]) {
      const orderitem = await OrderItem.findAll({where:{
        orderId: neworder[0].id, productId: newproduct.id
      }})
      const count = orderitem[0].quantity
      const updatedorderitem = await orderitem[0].update({quantity: count+1})
      res.json(updatedorderitem)
    } else {
    neworder[0].addProducts(newproduct);
    newproduct.addOrders(neworder[0]);
    res.json(neworder[0]);
    }
  } catch (err) {
    next(err);
  }
});

//when the user is logged in, this put route is used to change the order status to complete at checkout

router.put("/:userid", async (req, res, next) => {
  try {
    const order = await Order.findAll({ where: { userId: req.params.userid, status: 'incomplete' } });
    const updatedorder = await order[0].update({ status: "complete" });
    res.json(updatedorder);
  } catch (err) {
    next(err);
  }
});



