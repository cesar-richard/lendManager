const user = require('./user'),
  article = require('./article'),
  category = require('./category'),
  lend = require('./lend'),
  association = require('./association');

exports.define = db => {
  association.getModel(db);
  user.getModel(db);
  category.getModel(db);
  article.getModel(db);
  lend.getModel(db);

  db.models.association.associate(db.models);
  db.models.user.associate(db.models);
  db.models.category.associate(db.models);
  db.models.article.associate(db.models);
  db.models.lend.associate(db.models);
};
