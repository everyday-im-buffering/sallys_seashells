// probably this be merged into the shells.js and users.js route files as relevant?
// where will the users GET call be used? if it's for admin purposes, we should query past orders with it probably

const router = require("express").Router();
const Shell = require("../db/models/Shell"); // server/db/models/Shell.js

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
router.put("/shells/id", async (req, res, next) => {
  try {
    const shell = await Shell.findByPk(req.params.id);
    res.json(await shell.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
