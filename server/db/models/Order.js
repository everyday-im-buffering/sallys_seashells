const Sequelize = require("sequelize");
const db = require("../db");
const Shell = require("./Shell");
const Order_Details = require("./OrderDetails");

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

Shell.belongsToMany(Order, { through: Order_Details });
Order.belongsToMany(Shell, { through: Order_Details });

Order.hasMany(Order_Details);
Order_Details.belongsTo(Order);

Shell.hasMany(Order_Details);
Order_Details.belongsTo(Shell);

Order.prototype.addToCart = async function (shell) {
  // creating line in order_details with shellId and orderId
  // check if this shell already exists

  const exists = await this.hasShell(shell.id);
  let orderDetails;
  const allDetails = await this.getOrder_details();
  if (!exists) {
    orderDetails = await this.addShell(shell.id);
  } else {
    orderDetails = allDetails.filter(
      (info) => info.dataValues.shellId === shell.id
    );
  }
  const info = orderDetails[0].dataValues;

  // Sequelize Query through table  where shellId and orderId match
  // then update that with info variable
  const lineToUpdate = await Order_Details.findOne({
    where: {
      shellId: shell.id,
      orderId: this.id,
    },
  });

  await lineToUpdate.update({
    numberOfItems: info.numberOfItems + 1,
    totalPrice: (info.totalPrice += shell.price),
  });

  await this.update({
    numberOfItems: this.numberOfItems + 1,
    subTotal: (this.subTotal += shell.price),
  });
  return this;
};

module.exports = Order;
