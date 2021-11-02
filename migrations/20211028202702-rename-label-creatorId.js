'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Label', 'creatorId', 'userId', {
      comment: "创建者id",
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Label', 'userId', 'creatorId', {
      comment: "创建者id",
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  }
};
