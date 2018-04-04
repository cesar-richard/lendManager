const user = require('./user'),
  article = require('./article'),
  category = require('./category'),
  role = require('./role'),
  lend = require('./lend'),
  membership = require('./membership'),
  association = require('./association');

exports.define = db => {
  association.getModel(db);
  user.getModel(db);
  role.getModel(db);
  category.getModel(db);
  membership.getModel(db);
  article.getModel(db);
  lend.getModel(db);

  db.models.association.associate(db.models);
  db.models.user.associate(db.models);
  db.models.category.associate(db.models);
  db.models.article.associate(db.models);
  db.models.lend.associate(db.models);
};
