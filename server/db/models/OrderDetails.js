const Sequelize = require("sequelize");
const db = require("../db");

const Order_Details = db.define("order_details", {
    number_of_items: Sequelize.INTEGER,
    total_price: Sequelize.INTEGER
})

module.exports = Order_Details;