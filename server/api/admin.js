// probably this be merged into the shells.js and users.js route files as relevant?
// where will the users GET call be used? if it's for admin purposes, we should query past orders with it probably

const router = require("express").Router();
const Shell = require("../db/models/Shell"); // server/db/models/Shell.js
const User = require("../db/models/User");


// create new shell
router.post("/shells/", async (req, res, next) => {
  try {
    const shell = await Shell.create(req.body);
    res.status(201).send(shell);
  } catch (err) {
    next(err);
  }
});

// remove a shell
router.delete("/shells/:id", async (req, res, next) => {
  try {
    const shell = await Shell.findByPk(req.params.id);
    await shell.destroy();
    res.json(shell);
  } catch (err) {
    next(err);
  }
});

// update a shell
router.put("/shop/:id/edit", async (req, res, next) => {
  try {
    const shell = await Shell.findByPk(req.params.id);
    res.json(await shell.update(req.body));
  } catch (err) {
    next(err);
  }
});

// "/admin/users/:id routes" if admins have the ability to edit user info

// fetch all info for all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// fetch all info a single user
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// update a single user
router.put("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

// delete a single user
router.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// not sure if an admin needs to create new users, but if so:
// router.post("/users/", async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).send(user);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
