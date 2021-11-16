const ordersRouter = require("express").Router();
// const { default: allShellsReducer } = require("../../client/store/allProducts");
const Order = require("../db/models/Order");
const Shell = require("../db/models/Shell");
const OrderDetails = require("../db/models/OrderDetails");
const User = require("../db/models/User");

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

//api route to query the order model, fetching the user's cart when they go to the cart component
ordersRouter.get("/:id", async (req, res, next) => {
  try {
    //populate the cart by fetching the order details associated with the userId and one that isn't fufilled
    //include the order details but is it a security issue to send back all of the attributes?
    console.log(req.params);
    //if the session id matches the user id or however we are verifying a logged in user else we just find by OrderId
    //if auth, add the user to the Order with addUser
    const getUsersOrder = await Order.findOne({
      where: {
        id: req.params.id,
        isFulfilled: false,
      },
      attributes: ["subTotal", "numberOfItems"],
      include: [
        {
          model: OrderDetails,
          attributes: ["numberOfItems", "totalPrice"],
          include: [{ model: Shell, attributes: ["name", "imageUrl"] }],
        },
      ],
      // ,
    });
    console.log(getUsersOrder);
    res.send(getUsersOrder);
  } catch (e) {
    next(e);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  const orderCookie = req.signedCookies["orderNumber"] || undefined;
  try {
    console.log("the Body", req.body);
    console.log("orderCookie", orderCookie);

    if (orderCookie === undefined) {
      const newOrder = await Order.create({});
      await newOrder.addToCart(req.body);
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

      //add to order details.
      await foundOrder.addToCart(req.body);
      res.send(foundOrder);
    }
  } catch (err) {
    next(err);
  }
});

ordersRouter.post("/userCart", async (req, res, next) => {
  try {
    let userId = parseInt(req.body.userId);
    const [order, created] = await Order.findOrCreate({
      where: { userId: userId, isFulfilled: false },
    });
    let newOrder = order;
    await newOrder.addToCart(req.body);
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
