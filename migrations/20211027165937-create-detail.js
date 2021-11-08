'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        comment: "所属账簿id",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        comment: "所属用户id",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        comment: "账单类型[0:支出,1:收入](默认0)",
        allowNull: false,
        defaultValue: "0",
        type: Sequelize.ENUM('0', '1', '2'),
      },
      date: {
        comment: "账单生成日期",
        allowNull: false,
        type: Sequelize.DATE,
      },
      amount: {
        comment: "金额",
        allowNull: false,
        type: Sequelize.DECIMAL(8, 2),
      },
      labelId: {
        comment: "分类标签id",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      remark: {
        comment: "备注",
        type: Sequelize.STRING(100),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Detail');
  }
};