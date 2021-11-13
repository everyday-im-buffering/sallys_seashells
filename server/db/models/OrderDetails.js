const Sequelize = require("sequelize");
const db = require("../db");

const Order_Details = db.define("order_details", {
  numberOfItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

//class Methods
//calculate price and numofitems

module.exports = Order_Details;
