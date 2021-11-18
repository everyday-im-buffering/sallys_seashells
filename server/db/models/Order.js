const Sequelize = require("sequelize");
const db = require("../db");
const Shell = require("./Shell");
const Order_Details = require("./OrderDetails");

const Order = db.define("order", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  subTotal: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      min: 0,
    },
  },
  numberOfItems: {
    type: Sequelize.INTEGER,
    // allowNull: false,
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
// console.log("orderProto", Order.prototype)
// console.log("order_DetailProto", Order_Details.prototype)
// Adding a shell to the order
Order.prototype.addToCart = async function (shell) {
  // creating line in order_details with shellId and orderId
  // check if this shell already exists
  const newQuantity = shell.newQuantity || 1; // defaults to adding 1 shell
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
    numberOfItems: info.numberOfItems + newQuantity,
    totalPrice: (info.totalPrice += newQuantity * shell.price),
  });

  await this.update({
    numberOfItems: this.numberOfItems + newQuantity,
    subTotal: (this.subTotal += newQuantity * shell.price),
  });

  // update shell in Shell model to reflect inventory change
  const inventoryShell = await Shell.findByPk(shell.id);

  await inventoryShell.update({
    quantity: inventoryShell.quantity - newQuantity,
  });

  return this;
};

// update shell qty from order
Order.prototype.updateCartQty = async function (shell) {
  // like addToCart, shell will come with a qty property
  // const qty = shell.newQuantity || 1; // defaults to adding one shell
  // const allDetails = await this.getOrder_details();
  // const orderDetails = allDetails.filter(
  //   (info) => info.dataValues.shellId === shell.id
  // );
  // const info = orderDetails[0].dataValues;
  //   console.log("info",orderDetails )
  // const lineToUpdate = await Order_Details.findOne({
  //   where: {
  //     shellId: shell.id,
  //     orderId: this.id,
  //   },
  // });

  // await lineToUpdate.update({
  //   numberOfItems: info.numberOfItems + qty,
  //   totalPrice: (info.totalPrice += qty * shell.price),
  // });

  await this.update({
    numberOfItems: this.numberOfItems + qty,
    subTotal: (this.subTotal += qty * shell.price),
  });

  // update shell in Shell model to reflect inventory change
  const inventoryShell = await Shell.findByPk(shell.id);

  await inventoryShell.update({
    quantity: inventoryShell.quantity + qty,
  });
  return this;
};

// Removing a shell from the order
Order.prototype.removeFromCart = async function (shell) {
  // pull qty + price in cart from Order_Details
  const lineToRemove = await Order_Details.findOne({
    where: {
      shellId: shell.id,
      orderId: this.id,
    },
  });

  const qty = lineToRemove.numberOfItems;
  const price = lineToRemove.totalPrice;

  // destroy line in Order_Details
  this.removeShell(shell.id);

  // update Order qty + price to reflect removal
  await this.update({
    numberOfItems: this.numberOfItems - qty,
    subTotal: this.subTotal - price,
  });

  // update shell in Shell model to reflect inventory change
  const inventoryShell = await Shell.findByPk(shell.id);

  await inventoryShell.update({
    quantity: inventoryShell.quantity + qty,
  });

  return this;
};

module.exports = Order;
