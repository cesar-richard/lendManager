const Sequelize = require('sequelize');

exports.getModel = db => {
  const role = db.define(
    'role',
    {
      name: Sequelize.STRING,
      canView: Sequelize.BOOLEAN,
      canEdit: Sequelize.BOOLEAN
    },
    {
      classMethods: {
        associate(models) {
          role.hasMany(models.membership);
        }
      }
    }
  );
  return role;
};
