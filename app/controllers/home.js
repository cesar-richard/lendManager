const errors = require('../errors');

exports.home = (req, res, next) => {
  res.render('layout');
};
