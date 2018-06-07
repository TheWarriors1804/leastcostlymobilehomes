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

//get all the orders for the user
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

//get all the products in the user's cart
router.get("/cart/:userid", async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userid,
        status: "incomplete"
      },
      include: [{ model: Product }]
    });
    const cart = {};
    order[0].products.map(product => {
      const id = product.id;
      const value = product.orderItem.quantity;
      cart[id] = value;
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//when no one is logged in, this post route creates a new order in the orders table on checkout.  the session id and order items will be pased through the req.body. status should be 'complete in req.body. each item id should be kept in an array on req.body.items
router.post("/", async (req, res, next) => {
  const target = req.body;
  try {
    const makeorder = await Order.create({
      sessionId: "test4",
      status: "complete"
    });
    console.log("makeorder", makeorder.dataValues);
    console.log("makeorder.dataValues.id", makeorder.dataValues.id);
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        const product = await Product.findById(key);
        // makeorder.addProducts(product);
        // product.addOrders(makeorder);
        const makeorderid = makeorder.dataValues.id;
        console.log("makeorderid", makeorderid);
        const orderitem = await OrderItem.create({
          orderId: makeorderid, productId: key, quantity: target[key]
        })
        console.log("orderitem", orderitem);
      }
    }
    res.json(makeorder)
  } catch (err) {
    next(err);
  }
});

//when the user is logged in, this post route is used to create the order for the user and add products to the order
router.post("/:userid/:productid", async (req, res, next) => {
  const quantity = req.body.quantity;
  try {
    const neworder = await Order.findOrCreate({
      where: { userId: req.params.userid, status: "incomplete" },
    });
    const newproduct = await Product.findById(req.params.productid);
    const association = await Order.findAll({
      where: { id: neworder[0].id },
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
    });
    if (association[0].products[0]) {
      const orderitem = await OrderItem.findAll({
        where: {
          orderId: neworder[0].id,
          productId: newproduct.id
        }
      });
      // const count = orderitem[0].quantity;
      const updatedorderitem = await orderitem[0].update({
        quantity: quantity
      });
      res.json(updatedorderitem);
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
    const order = await Order.findAll({
      where: { userId: req.params.userid, status: "incomplete" }
    });
    const updatedorder = await order[0].update({ status: "complete" });
    res.json(updatedorder);
  } catch (err) {
    next(err);
  }
});


//this route allows logged in users to clear their cart
router.delete('/:userid', async(req, res, next) => {
  try {
    const order = await Order.findAll({
      where:{userId: req.params.userid, status: 'incomplete'}
    })
    console.log('order', order[0])
    await order[0].destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
