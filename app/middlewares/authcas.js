const sessionManager = require('./../services/sessionManager'),
  orm = require('./../orm'),
  CASAuthentication = require('cas-authentication'),
  config = require('../../config').common.cas,
  cas = new CASAuthentication(config);

exports.bounce = (req, res, next) => {
  cas.bounce(req, res, next);
};

exports.block = (req, res, next) => {
  cas.block(req, res, next);
};

exports.logout = (req, res, next) => {
  cas.logout(req, res, next);
};
