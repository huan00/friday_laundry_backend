require('dotenv').config()
module.exports = {
  development: {
    database: 'friday_laundry',
    dialect: 'postgres'
  },
  test: {
    database: 'friday_laundry',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
