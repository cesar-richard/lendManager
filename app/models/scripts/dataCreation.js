exports.execute = db => {
  const data = [];

  // Associations
  data.push(db.models.association.create({ name: 'PicsArt', login: 'picsart', active: true }));
  data.push(db.models.association.create({ name: 'SiMDE', login: 'simde', active: true }));

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
