'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('lend', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      taken: {
        type: Sequelize.BOOLEAN
      },
      returned: {
        type: Sequelize.BOOLEAN
      },
      comment: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('lend');
  }
};
