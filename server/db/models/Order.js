const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  subTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  numberOfItems: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

module.exports = Order;
