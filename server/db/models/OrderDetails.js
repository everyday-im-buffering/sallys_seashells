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

Order_Details.prototype.increment_or_decrement_quant_price = async function (
  price,
  category
) {
  if (category === "increment") {
    const updatedDetails = await this.increment({
      numberOfItems: 1,
      totalPrice: price,
    });
  } else {
    const updatedDetails = await this.decrement({
      numberOfItems: 1,
      totalPrice: price,
    });
  }

  return this;
};

//class Methods
//calculate price and numofitems

module.exports = Order_Details;
