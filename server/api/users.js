const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//which route do we want our users cart to be on?
// ordersRouter.get("/:userId", async (req, res, next) => {
//   try {
//     console.log(req.params.id)
//     const getOrderByUserId = await Order.findOne({
//       where: {
//         userId: req.params.id,
//         isFulfilled: false
//       },
//       attributes: ['subTotal', 'numberOfItems'],
//       include: [
//         {
//           model: OrderDetails, attributes: ['numberOfItems', 'totalPrice'],
//           include: [
//             { model: Shell, attributes: ['name', 'imageUrl'] }
//           ]
//         }
//       ]
//     })
//     res.send(getOrderByUserId);
//   } catch (e) {
//     console.log(e)
//   }
// })

// get single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "email"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
