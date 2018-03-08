const Sequelize = require('sequelize');

exports.getModel = db => {
  const article = db.define(
    'article',
    {
      model: Sequelize.STRING,
      brand: Sequelize.STRING,
      comment: Sequelize.TEXT,
      price: Sequelize.INTEGER,
      active: Sequelize.BOOLEAN
    },
    {
      classMethods: {
        associate(models) {
          article.belongsTo(models.category, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );

  return article;
};
