const Sequelize = require('sequelize');

exports.getModel = db => {
  const article = db.define('article', {
    model: Sequelize.STRING,
    brand: Sequelize.STRING,
    comment: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN
  });

  article.associate = function(models) {
    article.belongsTo(models.category);
    article.hasMany(models.lend);
  };

  return article;
};
