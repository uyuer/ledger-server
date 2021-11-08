'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Label', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        comment: "标签名",
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      userId: {
        comment: "创建者id",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdByUser: {
        comment: "是否是系统创建",
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Label');
  }
};