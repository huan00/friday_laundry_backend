'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Option, { through: Product_Option })
      // define association here
    }
  }
  Product.init(
    {
      sku: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      weight: DataTypes.STRING,
      descriptions: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      image: DataTypes.STRING,
      category: DataTypes.STRING,
      create_date: DataTypes.DATE,
      stock: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
    }
  )
  return Product
}
