const Sequelize = require('sequelize');

exports.getModel = db => {
  const association = db.define('association', {
    name: Sequelize.STRING,
    login: Sequelize.STRING,
    active: Sequelize.BOOLEAN
  });
  association.associate = function(models) {
    association.hasMany(models.membership);
    association.hasMany(models.category);
  };
  return association;
};
