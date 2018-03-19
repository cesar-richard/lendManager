const auth = require('./middlewares/auth'),
  authcas = require('./middlewares/authcas'),
  home = require('./controllers/home'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  articles = require('./controllers/articles'),
  associations = require('./controllers/associations'),
  unknownResource = require('./controllers/unknownResource');

exports.init = app => {
  // Users
  app.post('/users/sessions', [authcas.bounce], users.getAll);
  app.get('/users/me', [authcas.bounce], users.loggedUser);
  app.put('/users', [authcas.bounce], users.update);
  app.post('/users', [authcas.bounce], users.create);
  app.get('/logout', [authcas.logout], users.getAll);

  // Home
  app.get('/', [], home.home);

  // Books
  //app.get('/asso/all', [], associations.getAll);
  app.get('/asso/:login', [], associations.getByLogin);
  app.get('/books/:id', [authcas.bounce], books.getById);
};
