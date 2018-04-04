const Sequelize = require('sequelize');

exports.getModel = db => {
  const category = db.define('category', {
    name: Sequelize.STRING
  });
  category.associate = function(models) {
    category.hasMany(models.article);
    category.belongsTo(models.association);
  };
  return category;
};
