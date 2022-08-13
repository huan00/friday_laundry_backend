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

const update = async (req, res) => {
  const { email, full_name, billing_address, phone, country } = req.body

  try {
    const customer = await Customer.findOne({ where: { email: email } })
    if (!customer) {
      return res.status(404).send({ message: 'No Customer Found!' })
    }
    const updatedCustomer = await Customer.update(
      {
        full_name: full_name,
        billing_address: billing_address,
        phone: phone,
        country: country
      },
      { where: { email: email } }
    )

    // res.send(updatedCustomer)

    if (updatedCustomer) {
      const customer = await Customer.findOne({
        where: { email: email },
        raw: true
      })
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
    return res.status(201).json({ message: 'error updating' })
  } catch (error) {
    res.send(error)
  }
}

const deleteCustomer = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    await Customer.destroy({ where: { id: parseInt(id) } })
    return res.json({ message: 'User deleted' })
  } catch (error) {
    res.send(error)
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  RegisterCustomer,
  Login,
  CheckSession,
  update,
  deleteCustomer
}
