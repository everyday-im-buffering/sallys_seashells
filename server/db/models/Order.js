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

// update order_details based on shell first then update order based on order_details
Order.prototype.addToCart = async function (shell) {
  // creating line in order_details with shellId and orderId 
  // check if this shell already exists
  console.log('order beofre adding shell: ', this)
  const shellDetails = await this.addShell(shell.id)

  // console.log('shell arg', shell)
  // console.log('added shell: ', shellDetails)
  await this.update(
    {
      numberOfItems: this.numberOfItems + 1,
      subTotal: this.subTotal += shell.price
    }
  )
  console.log('order after adding shell: ', this)
  return this;
}

module.exports = Order;
