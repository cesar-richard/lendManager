exports.execute = db => {
  const data = [];
  data.push(
    db.models.association
      .create({
        name: 'PicsArt',
        login: 'picsart',
        active: true
      })
      .then(asso => {
        const categoryBoitiers = db.models.category
          .create({
            name: 'Boitiers',
            associationId: asso.id
          })
          .then(category => {
            db.models.article
              .create({
                brand: 'Nikon',
                model: 'D3300',
                price: 400,
                active: true,
                categoryId: category.id
              })
              .then(() => {
                db.models.article.create({
                  brand: 'Canon',
                  model: '1000D',
                  price: 250,
                  active: true,
                  categoryId: category.id
                });
              });
          })
          .then(() => {
            db.models.category
              .create({
                name: 'Objectifs',
                associationId: asso.id
              })
              .then(category => {
                db.models.article
                  .create({
                    brand: 'Nikon',
                    model: '35mm f1.8',
                    price: 150,
                    active: true,
                    categoryId: category.id
                  })
                  .then(() => {
                    db.models.article.create({
                      brand: 'Tokina',
                      model: '18mm f5.6',
                      price: 80,
                      active: true,
                      categoryId: category.id
                    });
                  });
              });
          });
      })
  );

  data.push(
    db.models.association
      .create({
        name: 'SiMDE',
        login: 'simde',
        active: true
      })
      .then(asso => {
        db.models.category
          .create({
            name: 'Payutc Phones',
            associationId: asso.id
          })
          .then(category => {
            db.models.article
              .create({
                brand: 'Payutc Phone',
                model: 'BDE 1',
                price: 200,
                active: true,
                categoryId: category.id
              })
              .then(() => {
                db.models.article.create({
                  brand: 'Payutc Phone',
                  model: 'BDE 2',
                  price: 200,
                  active: true,
                  categoryId: category.id
                });
              })
              .then(() => {
                db.models.article
                  .create({
                    brand: 'Payutc Phone',
                    model: 'BDE 3',
                    price: 200,
                    active: true,
                    categoryId: category.id
                  })
                  .then(() => {
                    db.models.article.create({
                      brand: 'Payutc Phone',
                      model: 'BDE 4',
                      price: 200,
                      active: true,
                      categoryId: category.id
                    });
                  });
              });
          })
          .then(() => {
            db.models.category
              .create({
                name: 'Routers',
                associationId: asso.id
              })
              .then(category => {
                db.models.article
                  .create({
                    brand: 'Cisco',
                    model: '2950 48ports',
                    price: 400,
                    active: true,
                    categoryId: category.id
                  })
                  .then(() =>
                    db.models.article.create({
                      brand: 'Netgear',
                      model: 'Switch 24 ports',
                      price: 200,
                      active: true,
                      categoryId: category.id
                    })
                  );
              });
          });
      })
  );

  data.push(
    db.models.user
      .create({
        first_name: 'd_Cesar',
        last_name: 'd_Richard',
        username: 'cerichar',
        mail: 'email1@gmail.com'
      })
      .then(() => {
        db.models.user.create({
          first_name: 'd_Celine',
          last_name: 'd_Boucher',
          username: 'cboucher',
          mail: 'email2@gmail.com'
        });
      })
  );

  return Promise.all(data);
};
