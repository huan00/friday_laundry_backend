'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Order_Detail, { foreignKey: 'order_id' })
      Order.belongsTo(models.Customer)
      // define association here
    }
  }
  Order.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      amount: DataTypes.INTEGER,
      shipping_address: DataTypes.STRING,
      order_email: DataTypes.STRING,
      order_date: DataTypes.DATE,
      order_status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders'
    }
  )
  return Order
}
