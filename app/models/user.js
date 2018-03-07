const Sequelize = require('sequelize');

exports.getModel = db => {
  return db.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING,
        unique: true
      },
      type: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true
    }
  );
};
