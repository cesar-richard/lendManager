const Sequelize = require('sequelize');

exports.getModel = db => {
  const membership = db.define(
    'membership',
    {},
    {
      classMethods: {
        associate(models) {
          membership.belongsTo(models.association, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
          membership.belongsTo(models.user, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
          membership.belongsTo(models.role, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return membership;
};
