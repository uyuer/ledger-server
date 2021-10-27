'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Detail.init({
    bookId: {
      comment: "所属账簿id",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      comment: "所属用户id",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    type: {
      comment: "账单类型[0:支出,1:收入](默认0)",
      allowNull: false,
      defaultValue: "0",
      type: DataTypes.ENUM('0', '1', '2'),
    },
    date: {
      comment: "账单生成日期",
      allowNull: false,
      type: DataTypes.DATE,
    },
    amount: {
      comment: "金额",
      allowNull: false,
      type: DataTypes.DOUBLE(8, 2),
    },
    labelId: {
      comment: "分类标签id",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    remark: {
      comment: "备注",
      type: DataTypes.STRING(100),
    }
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};