'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_Detail.belongsTo(models.Product)
      Order_Detail.belongsTo(models.Order)
      // define association here
    }
  }
  Order_Detail.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      price: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Order_Detail',
      tableName: 'order_details'
    }
  )
  return Order_Detail
}
