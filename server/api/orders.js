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
ordersRouter.get("/guestCart", async (req, res, next) => {
  try {
    const orderCookie = req.signedCookies["orderNumber"];
    const guestCart = await Order.findOne({
      where: {
        id: orderCookie,
        isFulfilled: false,
      },
      attributes: ["subTotal", "numberOfItems"],
      include: [
        {
          model: OrderDetails,
          attributes: ["numberOfItems", "totalPrice", "shellId"],
          include: [{ model: Shell, attributes: ["name", "imageUrl"] }],
        },
      ],
    });
    console.log(guestCart);
    res.send(guestCart);
  } catch (err) {
    next(err);
  }
});

ordersRouter.get("/:userId", async (req, res, next) => {
  try {
    //populate the cart by fetching the order details associated with the userId and one that isn't fufilled
    //include the order details but is it a security issue to send back all of the attributes?
    //if the session id matches the user id or however we are verifying a logged in user else we just find by OrderId
    //if auth, add the user to the Order with addUser

    const userCart = await Order.findOne({
      where: {
        userId: req.params.userId,
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
    });
    console.log(userCart);
    res.send(userCart);
  } catch (err) {
    next(err);
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

ordersRouter.put("/updateCartQuantity", async (req, res, next) => {
  try {
    let info = {
      userId: req.body.userId,
      id: req.body.shellId,
      price: req.body.totalPrice,
    };
    const orderCookie = req.signedCookies["orderNumber"] || undefined;

    if (info.userId) {
      let userOrderInstance = await Order.findOne({
        where: {
          userId: info.userId,
          isFulfilled: false,
        },
      });
   
      let od = await userOrderInstance.getOrder_details();
  
      console.log("od", od);
    } else {
      const orderDetailsInstance = await OrderDetails.findOne({
        where: {
          shellId: info.id,
          orderId: orderCookie,
        },
      });
    }

    res.send("orderUpdate");
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

ordersRouter.put("/confirmed/:orderId", async (req, res, next) => {
  try {
    const foundOrder = await Order.findOne({
      where: {
        id: req.params.orderId,
      },
    });
    foundOrder.isFulfilled = true;
    await foundOrder.save();
    //clear any cookies in Browser.
    res.clearCookie("orderNumber");
    res.status(201).send(foundOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
