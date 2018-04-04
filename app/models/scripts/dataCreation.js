exports.execute = db => {
  const data = [];

  // Associations
  data.push(
    db.models.association.create({ name: 'PicsArt', login: 'picsart', active: true }).then(asso => {
      const categoryBoitiers = db.models.category.create({ name: 'Boitiers', associationId: asso.id });
      const categoryObjectifs = db.models.category.create({ name: 'Objectifs', associationId: asso.id });
    })
  );
  data.push(
    db.models.association.create({ name: 'SiMDE', login: 'simde', active: true }).then(asso => {
      const categoryPayutcphones = db.models.category.create({
        name: 'Payutc Phones',
        associationId: asso.id
      });
      const categoryRouters = db.models.category.create({ name: 'Routers', associationId: asso.id });
    })
  );

  // Users
  data.push(
    db.models.user.create({
      first_name: 'd_Cesar',
      last_name: 'd_Richard',
      username: 'cerichar',
      mail: 'email1@gmail.com'
    })
  );

  data.push(
    db.models.user.create({
      first_name: 'd_Celine',
      last_name: 'd_Boucher',
      username: 'cboucher',
      mail: 'email2@gmail.com'
    })
  );
  return Promise.all(data);
};
