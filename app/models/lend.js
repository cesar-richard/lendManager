const Sequelize = require('sequelize');

exports.getModel = db => {
  const lend = db.define('lend', {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    taken: Sequelize.BOOLEAN,
    returned: Sequelize.BOOLEAN,
    comment: Sequelize.TEXT
  });

  lend.associate = function(models) {
    lend.belongsTo(models.user);
    lend.belongsToMany(models.article, { through: 'lendArticles' });
  };

  return lend;
};
