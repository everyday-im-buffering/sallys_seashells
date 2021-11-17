const express = require("express");
const app = express();
app.use(express.json());
const User = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
