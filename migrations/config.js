const config = require('./../config');

module.exports = {
  [config.environment]: Object.assign({}, config.common.database, {
    host: '127.0.0.1',
    port: 3306,
    name: 'picsart',
    username: 'root',
    password: ''
  })
};
