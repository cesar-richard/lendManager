exports.execute = db => {
  const data = [];
  data.push(db.models.role.create({ name: 'Master', canEdit: true, canView: true }));
  data.push(db.models.role.create({ name: 'Member', canEdit: false, canView: true }));
  data.push(
    db.models.user.create({
      first_name: 'd_Cesar',
      last_name: 'd_Richard',
      username: 'cerichar',
      mail: 'email1@gmail.com'
    })
  );
  return Promise.all(data);
};
