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
  app.get('/logout', [authcas.logout], home.home);

  // Associations
  app.get('/associations/', [], associations.getAll);
  app.get('/associations/:loginAsso', [], associations.getByLogin);
  app.get('/associations/:loginAsso/lend', [], associations.lend);

  // API
  // Associations
  app.get('/api/associations/', [], associations.getAll);
  app.get('/api/associations/:loginAsso', [], associations.getAll);
  app.get('/api/associations/:loginAsso/lendings', [], associations.getAll);

  // Articles
  app.get('/api/articles/show/:idArticle', [], articles.getById);
  app.get('/api/articles/', [], articles.getAll);
  app.get('/api/articles/delete/:idArticle', [], users.getAll);
  app.get('/api/articles/edit/:idArticle', [], users.getAll);
  app.get('/api/articles/return/:idArticle', [], users.getAll);
};
