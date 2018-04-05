const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../app'),
  should = chai.should();

describe('associations', () => {
  describe('API', () => {
    describe('/api/associations GET', () => {
      it('should return all associations', done => {
        chai
          .request(server)
          .get('/api/associations')
          .then(res => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.associations.should.be.a('array');
            res.body.associations[0].should.have.property('id');
            res.body.associations[0].should.have.property('name').should.not.be.null;
            res.body.associations[0].should.have.property('login').should.not.be.null;
            res.body.associations[0].should.have.property('active').should.not.be.null;
            dictum.chai(res);
          })
          .then(() => done());
      });
    });
    describe('/api/associations/:login GET', () => {
      it('should return association with login picsart', done => {
        chai
          .request(server)
          .get('/api/associations/picsart')
          .then(res => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('association');
            res.body.association.should.have.property('id');
            res.body.association.should.have.property('name').should.not.be.null;
            res.body.association.should.have.property('login').should.not.be.null;
            res.body.association.should.have.property('active').should.not.be.null;
            dictum.chai(res);
          })
          .then(() => done());
      });

      it('should return error for association with login nothing', done => {
        chai
          .request(server)
          .get('/api/associations/nothing')
          .catch(err => {
            err.should.have.status(404);
            err.response.should.be.json;
            err.response.body.should.have.property('error');
          })
          .then(err => done());
      });
    });
  });

  describe('HTML', () => {
    describe('/associations/:login GET', () => {
      it('should return association with login picsart', done => {
        chai
          .request(server)
          .get('/associations/picsart')
          .then(res => {
            res.should.have.status(200);
            res.should.be.html;
            dictum.chai(res);
          })
          .then(() => done());
      });

      it('should return error for association with login nothing', done => {
        chai
          .request(server)
          .get('/associations/nothing')
          .catch(err => {
            err.should.have.status(404);
            err.response.should.be.json;
            err.response.body.should.have.property('error');
          })
          .then(err => done());
      });
    });
  });
});
