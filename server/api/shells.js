const productsRouter = require('express').Router();
const Shell = require('../db/models/Shell'); // server/db/models/Shell.js

//all shells route
productsRouter.get('/', async (_req, res, next) => {
  try {
    const allProducts = await Shell.findAll({});
    if (!allProducts) {
      return res.status(404).send("No Products Found")
    }
    res.json(allProducts);
  }
  catch (err) {
    next(err)
  }
})


//single route

module.exports = productsRouter;