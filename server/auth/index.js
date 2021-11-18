const router = require('express').Router()
const { models: { User } } = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {

  try {
    const email = req.body.email;
    const exists = await User.findOne({ where: { email: email } })
    if (exists) {
      res.send({ token: await User.authenticate(req.body) });
    }
    res.status(404).send('User not found');
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      res.status(401).send('Invalid email');
    }
    if (password.length <= 8) {
      res.status(401).send('Password must be at least 8 characters');
    }
    const user = await User.create(req.body)
    res.send({ token: await user.generateToken() })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
