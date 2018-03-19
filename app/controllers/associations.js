'use strict';

const bcrypt = require('bcrypt'),
  sessionManager = require('./../services/sessionManager'),
  service = require('../services/associations'),
  errors = require('../errors');

exports.getAll = (req, res, next) => {
  service
    .getAll()
    .then(associations => {
      res.status(200);
      res.send({ associations });
    })
    .catch(next);
};

exports.getByLogin = (req, res, next) => {
  service
    .getByLogin(req.params.login)
    .then(association => {
      res.status(200);
      res.send({ association });
    })
    .catch(next);
};
