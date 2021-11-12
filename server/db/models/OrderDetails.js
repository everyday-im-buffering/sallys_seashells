const Sequelize = require("sequelize");
const db = require("../db");

const Order_Details = db.define("order_details", {
  numberOfItems: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
  },
});


//class Methods 
//calculate price and numofitems


module.exports = Order_Details;
