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
    console.log(customer)
    if (
      customer &&
      (await middleware.comparePassword(req.body.password, customer.password))
    ) {
      let payload = {
        id: customer.id,
        email: customer.email
      }
      let token = middleware.createToken(payload)
      return res.send({ customer: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  RegisterCustomer,
  Login
}
