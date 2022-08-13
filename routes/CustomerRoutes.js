const router = require('express').Router()
const controller = require('../controllers/CustomerController')
const middleware = require('../middleware')

router.get('/info', (req, res) => {
  res.send('got info')
})
router.put('/update', controller.update)
router.post('/signup', controller.RegisterCustomer)
router.post('/login', controller.Login)
router.delete('/delete/:id', controller.deleteCustomer)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
