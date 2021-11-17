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

Order_Details.prototype.incrementQuantAndPrice = async function (price) {
  let updatedDetails = await orderDetailsInstance.increment({
    numberOfItems: 1,
    totalPrice: price,
  });
  return this;
};

//class Methods
//calculate price and numofitems

module.exports = Order_Details;
