const express = require('express')
require('dotenv').config()
const cors = require('cors')
const logger = require('morgan')

const CustomerRouter = require('./routes/CustomerRoutes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/customer', CustomerRouter)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
