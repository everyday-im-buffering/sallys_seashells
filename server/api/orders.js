const ordersRouter = require("express").Router();
const Order = require("../db/models/Order");
const Shell = require("../db/models/Shell");

// res.cookie("orderNumber", "359ABC", {
//   maxAge: 900000,
//   httpOnly: true,
//   signed: true,
// });

//find or create order
// ordersRouter.put('/:orderId/:userId', async (req, res, next) => {
//     let orderId = req.params.orderId
//     const [order, created] = await Order.findOrCreate({
//         where: { id: userId },
//       });
//       // returns true if newly created and false if already existed
//       if(created){
//           console.log('created!')
//       }
// })
ordersRouter.get("/", async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({});
    if (!allOrders) {
      return res.status(404).send("No orders Found");
    }
    res.json(allOrders);
  } catch (err) {
    next(err);
  }
});
ordersRouter.post("/", async (req, res, next) => {
  try {
    const orderCookie = req.cookies.orderNumber;
    console.log("the Body", req.body);
    console.log("theCookie", orderCookie);
    if (orderCookie === undefined) {
      const newOrder = await Order.create({
        subTotal: req.body.shellPrice,
        numberOfItems: 1,
      });

      res.cookie("orderNumber", newOrder.id, {
        maxAge: 900000,
        httpOnly: true,
        // signed: true,
      });

      res.status(201).send(newOrder);
      console.log("new Order created!");
    } else {
      const foundOrder = await Order.findOne({ where: { id: orderCookie } });
     
      console.log("foundOrder", foundOrder);
      //find Shell
      const shell = await Shell.findByPk(req.body.shellId);
      //add to order details.
      await foundOrder.addShell(shell);
        //increment in Order model
      Order.increment({ subTotal: req.body.shellPrice, numberOfItems: 1}, { by: 2, where: { id: orderCookie } });
        foundOrder.save()
      res.send(foundOrder);
    }
  } catch (err) {
    next(err);
  }

  //         newOrder.addProductToCart(req.params.productId)
  //   }
});

module.exports = ordersRouter;
