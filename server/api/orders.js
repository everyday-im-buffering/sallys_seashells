const ordersRouter = require("express").Router();
const Order = require("../db/models/Order");
const Shell = require("../db/models/Shell");

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
  const orderCookie = req.signedCookies["orderNumber"] || undefined;
  try {
    console.log("the Body", req.body);

    if (orderCookie === undefined) {
      const newOrder = await Order.create({
        subTotal: req.body.shellPrice,
        numberOfItems: req.body.shellQuantiy
    
      });

    //   //find shell
    //   const shell = await Shell.findByPk(req.body.shellId);
    //   //add to order details
    //   await newOrder.addShell(shell);
        
      res.cookie("orderNumber", newOrder.id, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
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
      Order.increment(
        { subTotal: req.body.shellPrice, numberOfItems: 1 },
        { by: 2, where: { id: orderCookie } }
      );
      await foundOrder.save();
      res.send(foundOrder);
    }
  } catch (err) {
    next(err);
  }

});

module.exports = ordersRouter;
