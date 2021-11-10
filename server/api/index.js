const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
// router.use('/shells', require('./shells'))
router.use('/shells', require('./singleshell'))
// //comment this out
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
