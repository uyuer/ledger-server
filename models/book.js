'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    userId: {
      comment: "所属用户id",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      comment: "账本名",
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    remark: {
      comment: "备注",
      type: DataTypes.STRING(100),
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};