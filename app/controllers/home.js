const serviceAssociations = require('../services/associations'),
	errors = require('../errors');


exports.home = (req, res, next) => {
	console.log("test");
  //serviceAssociations
    //.getAll()
    //.then(associations => {
      res.render('layout');
    //})
    //.catch(next);
};