//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const Shell = require("./models/Shell");
const Order = require("./models/Order");
const Order_Details = require("./models/OrderDetails");

// Do these associations need to be moved to Order.js
// for when we implement associating an order and user?
Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Shell,
    Order,
    Order_Details,
  },
};
