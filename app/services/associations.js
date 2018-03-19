const orm = require('./../orm'),
  errors = require('../errors');

exports.create = asso => {
  return orm.models.association.create(asso).catch(err => {
    throw errors.savingError(err.errors);
  });
};

exports.getOne = asso => {
  return orm.models.association.findOne({ where: asso }).catch(err => {
    throw errors.databaseError(err.detail);
  });
};

exports.getByLogin = login => {
  return exports.getOne({ login });
};

exports.getAll = (props, limit = 20, offset = 0) => {
  return orm.models.association
    .findAll({
      where: props,
      offset,
      limit
    })
    .catch(err => {
      throw errors.databaseError(err.detail);
    });
};

exports.update = (props, asso) => {
  return asso.update(props).catch(err => {
    throw errors.savingError(err.errors);
  });
};
