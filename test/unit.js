const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, setAccounts, setTransferLogs } = require('../app.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Unit test', function() {
  /*
   * Create account API.
   */
  describe('POST /api/create_account', function() {
    before(function() {
      setAccounts([]);
    });

    // For simplicity, tests related to request body's validity are omitted (pending), listed as follows:
    it('should fail if request body does not have `name` property');
    it('should fail if `name` is not a string');
    it('should fail if string length of `name` is not between 1 and 100');
    it('should fail if request body does not have `balance` property');
    it('should fail if `balance` is not an integer');
    it('should fail if `balance` is negative');

    // Main funciton test:
    it('should success if request body is valid', function(done) {
      chai.request(app)
        .post('/api/create_account')
        .send({ name: 'foo', balance: 0 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 0);
          res.body.result.should.have.property('name', 'foo');
          res.body.result.should.have.property('balance', 0);
          done();
        });
    });
  });

  /*
   * Deposit API.
   */
  describe('POST /api/deposit', function() {
    before(function() {
      setAccounts([
        { id: 0, name: 'foo', balance: 0 },
      ]);
    });

    // For simplicity, tests related to request body's validity are omitted (pending), listed as follows:
    it('should fail if request body does not have `accountId` property');
    it('should fail if `accountId` is not an integer');
    it('should fail if request body does not have `amount` property');
    it('should fail if `amount` is not an integer');
    it('should fail if `amount` is not positive');
    it('should fail if account does not exist');

    // Main funciton test:
    it('should success if request body is valid', function(done) {
      chai.request(app)
        .post('/api/deposit')
        .send({ accountId: 0, amount: 10000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 0);
          res.body.result.should.have.property('name', 'foo');
          res.body.result.should.have.property('balance', 10000);
          done();
        });
    });
  });

  /*
   * Withdraw API.
   */
  describe('POST /api/withdraw', function() {
    before(function() {
      setAccounts([
        { id: 0, name: 'foo', balance: 10000 },
      ]);
    });

    // For simplicity, tests related to request body's validity are omitted (pending), listed as follows:
    it('should fail if request body does not have `accountId` property');
    it('should fail if `accountId` is not an integer');
    it('should fail if request body does not have `amount` property');
    it('should fail if `amount` is not an integer');
    it('should fail if `amount` is not positive');
    it('should fail if account does not exist');
    it('should fail if balance is insufficient');

    // Main funciton test:
    it('should success if request body is valid', function(done) {
      chai.request(app)
        .post('/api/withdraw')
        .send({ accountId: 0, amount: 3000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id', 0);
          res.body.result.should.have.property('name', 'foo');
          res.body.result.should.have.property('balance', 7000);
          done();
        });
    });
  });

  /*
   * Transfer API.
   */
  describe('POST /api/transfer', function() {
    before(function() {
      setAccounts([
        { id: 0, name: 'foo', balance: 10000 },
        { id: 1, name: 'bar', balance: 0 },
      ]);
      setTransferLogs([]);
    });

    // For simplicity, tests related to request body's validity are omitted (pending), listed as follows:
    it('should fail if request body does not have `fromAccountId` property');
    it('should fail if `fromAccountId` is not an integer');
    it('should fail if request body does not have `toAccountId` property');
    it('should fail if `toAccountId` is not an integer');
    it('should fail if request body does not have `amount` property');
    it('should fail if `amount` is not an integer');
    it('should fail if `amount` is not positive');
    it('should fail if account does not exist');
    it('should fail if balance is insufficient');

    // Main funciton test:
    it('should success if request body is valid', function(done) {
      chai.request(app)
        .post('/api/transfer')
        .send({ fromAccountId: 0, toAccountId: 1, amount: 3000 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('success', true);
          res.body.should.have.property('result');
          res.body.result.should.have.property('id');
          res.body.result.should.have.property('fromAccountId', 0);
          res.body.result.should.have.property('toAccountId', 1);
          res.body.result.should.have.property('amount', 3000);
          res.body.result.should.have.property('timestamp');
          done();
        });
    });
  });
});
