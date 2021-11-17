const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    //const token = req.headers.authorization;
    const user = await User.findByToken(req.headers.authorization);
    // something is going wrong with findByToken
    req.user = user;
    next();
  } catch (err) {
    // always ending up here WHY
    res.status(401).send("Invalid token!");
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
