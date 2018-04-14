'use strict';

const bcrypt = require('bcrypt'),
  sessionManager = require('./../services/sessionManager'),
  userService = require('../services/users'),
  errors = require('../errors');

exports.getAll = (req, res, next) => {
  userService
    .getAll()
    .then(users => {
      res.status(200);
      res.send({ users });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const update = req.body;
  const user = req.user;
  const props = {
    firstName: update.firstName || user.firstName,
    lastName: update.lastName || user.lastName,
    username: update.username || user.username,
    email: update.email || user.email
  };

  userService
    .update(props, user)
    .then(u => {
      const auth = sessionManager.encode({ username: u.username });

      res.status(200);
      res.set(sessionManager.HEADER_NAME, auth);
      res.send(u);
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  const saltRounds = 10;

  const user = req.body
    ? {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
    : {};

  bcrypt
    .hash(user.password, saltRounds)
    .then(hash => {
      user.password = hash;

      userService
        .create(user)
        .then(u => {
          res.status(200);
          res.end();
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(errors.defaultError(err));
    });
};

exports.logout = (req, res, next) => {
  res.status(200);
  res.end();
};

exports.login = (req, res, next) => {
  res.render('loginForm');
};

exports.loggedUser = (req, res, next) => {
  if (req.session.cas_user) {
    res.status(200);
    const user = {
      firstName: req.session.cas_infos.givenName,
      lastName: req.session.cas_infos.sn,
      username: req.session.cas_user,
      email: req.session.cas_infos.mail
    };
    res.send(user);
  } else {
    res.status(401);
    res.send({ error: 'Not logged in' });
  }
};
