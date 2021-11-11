const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isComplete: Sequelize.BOOLEAN,
});

module.exports = Order;
