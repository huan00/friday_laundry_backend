const router = require('express').Router()
const controller = require('../controllers/CustomerController')

router.get('/info', (req, res) => {
  res.send('got info')
})
router.post('/signup', controller.RegisterCustomer)
router.post('/login', controller.Login)

module.exports = router
