//this is the access point for all things database related!
const db = require('./db')
const User = require('./models/User')
const Shell = require('./models/Shell')
const Order = require('./models/Order')
const Order_Details = require('./models/OrderDetails')

//associations could go here!

Order.belongsTo(User)
User.hasMany(Order)

Shell.belongsToMany(Order, { through: Order_Details })
Order.belongsToMany(Shell, { through: Order_Details})

// Order.belongsTo(User)
// User.hasMany(Order)

Order.hasMany(Order_Details)
Order_Details.belongsTo(Order)

Shell.hasMany(Order_Details)
Order_Details.belongsTo(Shell)

module.exports = {
  db,
  models: {
    User,
    Shell,
    Order,
    Order_Details
  },
}
