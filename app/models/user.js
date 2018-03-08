const Sequelize = require('sequelize');

exports.getModel = db => {
  const user = db.define(
    'user',
    {
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      username: Sequelize.STRING,
      mail: Sequelize.STRING,
      type: Sequelize.STRING,
      active: Sequelize.BOOLEAN
    },
    {
      classMethods: {
        associate(models) {
          user.hasMany(models.membeship);
        }
      }
    }
  );
  return user;
};
