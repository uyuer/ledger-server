'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Label', 'isSystemCreate', 'createdByUser', {
      comment: "是否是系统创建",
      allowNull: false,
      defaultValue: true,
      type: Sequelize.BOOLEAN,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Label', 'createdByUser', 'isSystemCreate', {
      comment: "是否是系统创建",
      allowNull: false,
      type: Sequelize.BOOLEAN,
    });
  }
};
