const router = require('express').Router()
const controller = require('../controllers/CustomerController')
const middleware = require('../middleware')

router.get('/info', (req, res) => {
  res.send('got info')
})
router.post('/signup', controller.RegisterCustomer)
router.post('/login', controller.Login)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
