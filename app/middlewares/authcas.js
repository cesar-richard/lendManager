const sessionManager = require('./../services/sessionManager'),
  orm = require('./../orm'),
  CASAuthentication = require('cas-authentication'),
  config = require('../../config'),
  cas = new CASAuthentication(config.common.cas),
  request = require('request'),
  parser = require('xml2json');

exports.auth = (req, res, next) => {
  if (req.session.cas_user) {
    next();
  } else {
    if (config.isTesting) {
      req.session.cas_user = config.common.cas.debug_user;
      req.session.cas_infos = config.common.cas.debug_infos;
      next();
    } else {
      if (req.body.login && req.body.password) {
        const casParams = {
          service: 'http://lend.crichard.fr/',
          username: req.body.login,
          password: req.body.password
        };
        const options = {
          method: 'POST',
          url: `${config.common.cas.cas_url}/v1/tickets/`,
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: casParams
        };

        request(options, function(error, response, body) {
          if (error) throw new Error(error);

          if (response.statusCode !== 201) {
            res.send(req.session.cas_infos);
          } else {
            options.url += response.headers.location.substr(this.href.lastIndexOf('/') + 2);
            // eslint-disable-next-line no-shadow
            request(options, function(error, response, body) {
              options.url = `${config.common.cas.cas_url}/p3/serviceValidate?service=${
                casParams.service
              }&ticket=${body}`;
              options.form = null;
              options.method = 'GET';
              // eslint-disable-next-line no-shadow
              request(options, function(error, response, body) {
                const casinfos = parser.toJson(body.replace(/cas\:/g, ''), { object: true }).serviceResponse
                  .authenticationSuccess;
                req.session.cas_user = casinfos.user;
                req.session.cas_infos = casinfos.attributes;
                next();
              });
            });
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  }
};

exports.bounce = (req, res, next) => {
  cas.bounce(req, res, function() {
    orm.models.user
      .findOrCreate({
        where: { username: req.session.cas_user },
        defaults: {
          mail: req.session.cas_infos.mail,
          active: true,
          type: 'classic',
          first_name: req.session.cas_infos.givenname,
          last_name: req.session.cas_infos.sn
        }
      })
      .spread((user, created) => {
        if (user.type === 'admin') {
          next();
        } else {
          request(`https://assos.utc.fr/associations/${req.params.loginAsso}/json`, function(
            error,
            response,
            body
          ) {
            const tmp = JSON.parse(body);
            if (tmp.error) {
              res.status(tmp.error.code);
              res.send(tmp.error.message);
            } else {
              const usr = tmp.members.find(item => {
                return item.login === req.session.cas_user;
              });
              if (!usr || !usr.bureau) {
                res.status(403);
                res.render('AuthFail', {
                  title: 'Unauthorized',
                  message: "Vous ne faites pas partie du bureau de l'association"
                });
              } else {
                next();
              }
            }
          });
        }
      });
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};
