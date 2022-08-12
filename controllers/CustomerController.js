const { Customer } = require('../models')
const middleware = require('../middleware')

const RegisterCustomer = async (req, res) => {
  try {
    const signUpInfo = req.body
    let passwordDigest = await middleware.hashPassword(signUpInfo.password)
    signUpInfo.password = passwordDigest
    const customer = await Customer.create(signUpInfo)
    res.send(customer)
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      customer &&
      middleware.comparePassword(customer.password, req.body.password)
    ) {
      let payload = {
        id: customer.id,
        email: customer.email,
        full_name: customer.full_name,
        phone: customer.phone,
        billing_address: customer.billing_address,
        country: customer.country
      }
      let token = middleware.createToken(payload)
      return res.json({ customer: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const updateCustomerInfo = async (req, res) => {}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  RegisterCustomer,
  Login,
  CheckSession
}
