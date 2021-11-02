'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Detail', 'amount', {
      comment: "金额",
      allowNull: false,
      type: Sequelize.DECIMAL(8, 2),
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Detail', 'amount', {
      comment: "金额",
      allowNull: false,
      type: Sequelize.DOUBLE(8, 2),
    });
  }
};
