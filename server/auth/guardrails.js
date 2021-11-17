const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    console.log("user: ", user);
    next();
  } catch (err) {
    res.status(401).send("Invalid token!");
  }
};

const isAdmin = async (req, res, next) => {
  //console.log("admin?");
  if (req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
