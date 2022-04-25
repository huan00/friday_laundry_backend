'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: customer_id })
      // define association here
    }
  }
  Customer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      billing_address: DataTypes.STRING,
      default_shipping_address: DataTypes.STRING,
      country: DataTypes.STRING,
      phone: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers'
    }
  )
  return Customer
}
