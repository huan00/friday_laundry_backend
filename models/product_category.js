'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Category.init(
    {
      product_id: {
        tyep: DataTypes.INTEGER,
        references: { model: 'products', key: 'id' }
      },
      category_id: {
        tyep: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'Product_Category',
      tableName: 'product_categories'
    }
  )
  return Product_Category
}
