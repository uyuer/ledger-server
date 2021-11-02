'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Label.init({
    label: {
      comment: "标签名",
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    userId: {
      comment: "创建者id",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdByUser: {
      comment: "是否是系统创建",
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Label',
  });
  return Label;
};