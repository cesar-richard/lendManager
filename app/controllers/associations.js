'use strict';

const bcrypt = require('bcrypt'),
  sessionManager = require('./../services/sessionManager'),
  serviceAsso = require('../services/associations'),
  errors = require('../errors');

exports.getAll = (req, res, next) => {
  serviceAsso
    .getAll()
    .then(associations => {
      res.status(200);
      res.send({ associations });
    })
    .catch(next);
};

exports.getByLogin = (req, res, next) => {
  serviceAsso
    .getByLogin(req.params.loginAsso)
    .then(association => {
      if (association) {
        res.render('assoShow', { association });
      } else {
        res.status(404);
        res.send({ error: 'association not found' });
      }
    })
    .catch(next);
};

exports.lend = (req, res, next) => {
  serviceAsso
    .getByLogin(req.params.loginAsso)
    .then(association => {
      res.render('lendForm', { association });
    })
    .catch(next);
};
