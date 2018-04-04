const service = require('../services/articles'),
  errors = require('../errors');

exports.getById = (req, res, next) => {
  service
    .getById(req.params.idArticle)
    .then(article => {
      res.send(article);
    })
    .catch(next);
};

exports.getAll = (req, res, next) => {
  service
    .getAll()
    .then(articles => {
      res.status(200);
      res.send({ articles });
    })
    .catch(next);
};
