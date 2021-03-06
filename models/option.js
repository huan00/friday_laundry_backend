'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option.belongsToMany(models.Product, {
        through: 'Product_Option'
      })
    }
  }
  Option.init(
    {
      option_name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Option',
      tableName: 'options'
    }
  )
  return Option
}
