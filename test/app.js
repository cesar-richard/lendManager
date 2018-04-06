'use strict';

const fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  Sequelize = require('sequelize'),
  models = require('../app/models'),
  orm = require('./../app/orm'),
  dataCreation = require('./../app/models/scripts/dataCreation');

chai.use(chaiHttp);

const db = new Sequelize(orm.DB_URL, { logging: false });

before('drop tables, re-create them and populate sample data', done => {
  models.define(db);
  db
    .query('SET FOREIGN_KEY_CHECKS = 0;', { raw: true })
    .then(() => db.drop())
    .then(() => db.sync({ force: true }))
    .then(() => dataCreation.execute(db))
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1;', { raw: true }))
    .then(() => {
      exports.models = db.models;
      done();
    });
});

const normalizedPath = path.join(__dirname, '.');
fs.readdirSync(normalizedPath).forEach(file => {
  require(`./${file}`);
});
