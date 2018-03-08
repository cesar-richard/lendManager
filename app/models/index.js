const user = require('./user'),
  article = require('./article'),
  category = require('./category'),
  role = require('./role'),
  membership = require('./membership'),
  association = require('./association');

exports.define = db => {
  association.getModel(db);
  user.getModel(db);
  role.getModel(db);
  category.getModel(db);
  membership.getModel(db);
  article.getModel(db);
};
