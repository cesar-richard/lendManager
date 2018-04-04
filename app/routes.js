const auth = require('./middlewares/auth'),
  authcas = require('./middlewares/authcas'),
  home = require('./controllers/home'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  articles = require('./controllers/articles'),
  associations = require('./controllers/associations'),
  unknownResource = require('./controllers/unknownResource');

exports.init = app => {
  // Home
  app.get('/', [], home.home);

  // Users
  app.post('/users/sessions', [authcas.bounce], users.getAll);
  app.get('/users/me', [authcas.bounce], users.loggedUser);
  app.put('/users', [authcas.bounce], users.update);
  app.post('/users', [authcas.bounce], users.create);
  app.get('/logout', [authcas.logout], users.getAll);

  // Articles
  app.get('/articles/show/:idArticle', [], articles.getById);
  app.get('/articles/all', [], articles.getAll);
  app.get('/articles/delete/:idArticle', [], users.getAll);
  app.get('/articles/edit/:idArticle', [], users.getAll);
  app.get('/articles/return/:idArticle', [], users.getAll);

  // Associations
  // app.get('/asso/all', [], associations.getAll);
  app.get('/asso/:loginAsso', [], associations.getByLogin);
  app.get('/association/:loginAsso/lend', [], associations.lend);
};
