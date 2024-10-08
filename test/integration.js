const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, setAccounts, setTransferLogs } = require('../app.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Integration test', function() {
  describe('Create account, deposit, withdraw, transfer', function() {
    before(function() {
      setAccounts([
        { id: 0, name: 'foo', balance: 0 },
      ]);
      setTransferLogs([]);
    });

    it('should successfully create an account', function(done) {
      chai.request(app)
        .post('/api/create_account')
        .send({ name: 'bar', balance: 0 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 1);
          res.body.result.should.have.property('name', 'bar');
          res.body.result.should.have.property('balance', 0);
          done();
        });
    });

    it('should successfully deposit money to that account', function(done) {
      chai.request(app)
        .post('/api/deposit')
        .send({ accountId: 1, amount: 10000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 1);
          res.body.result.should.have.property('name', 'bar');
          res.body.result.should.have.property('balance', 10000);
          done();
        });
    });

    it('should successfully withdraw money from that account', function(done) {
      chai.request(app)
        .post('/api/withdraw')
        .send({ accountId: 1, amount: 3000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 1);
          res.body.result.should.have.property('name', 'bar');
          res.body.result.should.have.property('balance', 7000);
          done();
        });
    });

    it('should successfully transfer money from that account to another', function(done) {
      chai.request(app)
        .post('/api/transfer')
        .send({ fromAccountId: 1, toAccountId: 0, amount: 3000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id');
          res.body.result.should.have.property('fromAccountId', 1);
          res.body.result.should.have.property('toAccountId', 0);
          res.body.result.should.have.property('amount', 3000);
          res.body.result.should.have.property('timestamp');
          done();
        });
    });
  });
});
