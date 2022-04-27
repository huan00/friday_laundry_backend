const { Customer } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      customer &&
      (await middleware.comparePassword(customer.password, req.body.password))
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

const Register = async (req, res) => {
  try {
    const signUpInfo = req.body
    console.log(signUpInfo)
    let passwordDigest = await middleware.hashPassword(signUpInfo.password)
    signUpInfo.password = passwordDigest
    const customer = await Customer.create(signUpInfo)
    res.send(customer)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register
}
