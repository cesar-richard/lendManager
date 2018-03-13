const auth = require('./middlewares/auth'),
  authcas = require('./middlewares/authcas'),
  books = require('./controllers/books'),
  users = require('./controllers/users'),
  unknownResource = require('./controllers/unknownResource');

exports.init = app => {
  // Users
  app.post('/users/sessions', [], users.login);
  app.get('/users/me', [authcas.bounce], users.loggedUser);
  app.put('/users', [authcas.bounce], users.update);
  app.post('/users', [], users.create);
  app.get('/logout', [authcas.logout], users.login);

  // Test
  app.get('/test', [authcas.bounce], users.getAll);

  // Books
  app.get('/books', [], books.getAll);
  app.get('/books/:id', [], books.getById);
};
