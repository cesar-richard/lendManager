const Sequelize = require('sequelize');

exports.getModel = db => {
  const association = db.define(
    'association',
    {
      name: Sequelize.STRING,
      login: Sequelize.STRING,
      active: Sequelize.BOOLEAN
    },
    {
      classMethods: {
        associate(models) {
          association.hasMany(models.membership);
          association.hasMany(models.category);
        }
      }
    }
  );
  return association;
};
