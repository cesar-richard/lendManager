const sessionManager = require('./../services/sessionManager'),
orm = require('./../orm'),
CASAuthentication = require('cas-authentication'),
config = require('../../config').common.cas,
cas = new CASAuthentication(config),
request = require('request');

exports.bounce = (req, res, next) => {
  cas.bounce(req, res, function() {
    orm.models.user.findOrCreate({where: {username: req.session.cas_user},
      defaults: {mail: req.session.cas_infos.mail, active: true, type:"classic", first_name: req.session.cas_infos.givenname, last_name: req.session.cas_infos.sn}})
    .spread((user, created) => {
      if(user.type === "admin"){
        next();
      }else{
        request('https://assos.utc.fr/asso/picsart/json', function (error, response, body) {
          const tmp = JSON.parse(body);
          const usr = tmp.members.find(item => {
            return item.login === req.session.cas_user
          });
          if(!usr || !usr.bureau){
            res.status(403);
            res.render('AuthFail', { title: 'Unauthorized', message: 'Vous ne faites pas partie du bureau de l\'association' });
          }else{   
            next();
          }
        });
      }
    });
  });
};

exports.logout = (req, res, next) => {
  cas.logout(req, res, next);
};
