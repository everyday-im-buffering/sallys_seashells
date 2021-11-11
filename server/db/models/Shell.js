const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Shell = db.define("shell", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  marineType: {
    type: Sequelize.ENUM(
      "gastropoda",
      "bivalvia",
      "scaphopoda",
      "polyplacophora",
      "monoplacophora",
      "cephalopoda"
    ),
    allowNull: false,
  },
  color: {
    type: Sequelize.ENUM(
      "blue",
      "green",
      "brown",
      "white",
      "grey",
      "red",
      "multi"
    ),
    allowNull: false,
  },
  pattern: {
    type: Sequelize.ENUM("spotted", "striped", "solid"),
    defaultValue: "solid",
  },
  waterType: {
    type: Sequelize.ENUM("freshwater", "marine"),
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://static.wikia.nocookie.net/spongebob/images/5/59/Clubspongeboberrorfixhd.png/revision/latest?cb=20190715135521",
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Shell;
