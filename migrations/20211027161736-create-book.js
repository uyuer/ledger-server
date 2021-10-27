'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        comment: "所属用户id",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        comment: "账本名",
        allowNull: false,
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('Book');
  }
};