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
  app.get('/', home.home);
  app.post('/', authcas.auth, home.home);

  // Users
  app.get('/logout', authcas.logout, home.home);
  app.get('/login', users.login);
  app.post('/login', authcas.auth, home.home);

  // Associations
  app.get('/associations/', associations.getAll);
  app.get('/associations/:loginAsso', authcas.auth, associations.getByLogin);
  app.get('/associations/:loginAsso/lend', associations.lend);

  // API
  // Users
  app.post('/api/users/sessions', authcas.bounce, users.getAll);
  app.get('/api/users/me', authcas.auth, users.loggedUser);

  // Associations
  app.get('/api/associations/', associations.getAll);
  app.get('/api/associations/:loginAsso', associations.getApiByLogin);
  app.get('/api/associations/:loginAsso/lendings', associations.getAll);

  // Articles
  app.get('/api/articles/show/:idArticle', articles.getById);
  app.get('/api/articles/', articles.getAll);
  app.get('/api/articles/delete/:idArticle', users.getAll);
  app.get('/api/articles/edit/:idArticle', users.getAll);
  app.get('/api/articles/return/:idArticle', users.getAll);
};
