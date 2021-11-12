const ordersRouter = require('express').Router();
const Order = require('../db/models/Order');



//find or create order
ordersRouter.put('/:orderId/:userId', async (req, res, next) => {
    let orderId = req.params.orderId
    const [order, created] = await Order.findOrCreate({
        where: { id: userId },
      });
      // returns true if newly created and false if already existed
      if(created){
          console.log('created!')
      }
})










module.exports = ordersRouter;