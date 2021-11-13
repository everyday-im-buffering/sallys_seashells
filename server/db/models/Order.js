const Sequelize = require("sequelize");
const db = require("../db");
const Shell = require('./Shell');
const Order_Details = require('./OrderDetails');


// associations from db/index need to be imported here

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
      min: 0,
    },
  },
});

Shell.belongsToMany(Order, { through: Order_Details })
Order.belongsToMany(Shell, { through: Order_Details })

Order.hasMany(Order_Details)
Order_Details.belongsTo(Order)

Shell.hasMany(Order_Details)
Order_Details.belongsTo(Shell)

// console.log(Order.prototype)

Order.prototype.addToCart = async function (shell) {
  await this.addShell(shell.id)
  this.numberOfItems++;
  this.subTotal += shell.price;
  return this;
}

// console.log("from models/Order.js", Order.prototype)

module.exports = Order;
