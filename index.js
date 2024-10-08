const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

/*
 * Mock database.
 */
const accounts = []; // Account shape is { id, name, balance }.
const transferLogs = []; // Transfer log shapge is { id, fromAccountId, toAccountId, amount, timestamp }.

/*
 * Create account API.
 */
app.post('/api/create_account', (req, res) => {
  // Validate request body.
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    balance: Joi.number().integer().min(0).required(),
  });
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    res.status(400).send({ success: false, message: error.details[0].message });
    return;
  }

  // Create account and respond.
  const { name, balance } = req.body;
  const newAccount = {
    id: accounts.length,
    name,
    balance,
  };
  accounts.push(newAccount);
  res.send({ success: true, result: newAccount });
  console.log('accounts =', accounts);
});

/*
 * Deposit API.
 */
app.post('/api/deposit', (req, res) => {
  // Validate request body.
  const schema = Joi.object({
    accountId: Joi.number().integer().required(),
    amount: Joi.number().integer().greater(0).required(),
  });
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    res.status(400).send({ success: false, message: error.details[0].message });
    return;
  }

  // Check if account exists.
  const { accountId, amount } = req.body;
  const account = accounts.find(({ id }) => id === accountId);
  if (account === undefined) {
    res.status(404).send({ success: false, message: 'Account not found.' });
    return;
  }

  // Deposit money and respond.
  account.balance += amount;
  res.send({ success: true, result: account });
  console.log('accounts =', accounts);
});

/*
 * Withdraw API.
 */
app.post('/api/withdraw', (req, res) => {
  // Validate request body.
  const schema = Joi.object({
    accountId: Joi.number().integer().required(),
    amount: Joi.number().integer().greater(0).required(),
  });
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    res.status(400).send({ success: false, message: error.details[0].message });
    return;
  }

  // Check if account exists.
  const { accountId, amount } = req.body;
  const account = accounts.find(({ id }) => id === accountId);
  if (account === undefined) {
    res.status(404).send({ success: false, message: 'Account not found.' });
    return;
  }

  // Check if balance is sufficient.
  if (account.balance < amount) {
    res.status(400).send({ success: false, message: 'Account balance insufficient.' });
    return;
  }

  // Withdraw money and respond.
  account.balance -= amount;
  res.send({ success: true, result: account });
  console.log('accounts =', accounts);
});

/*
 * Transfer API.
 */
app.post('/api/transfer', (req, res) => {
  // Validate request body.
  const schema = Joi.object({
    fromAccountId: Joi.number().integer().required(),
    toAccountId: Joi.number().integer().required(),
    amount: Joi.number().integer().greater(0).required(),
  });
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    res.status(400).send({ success: false, message: error.details[0].message });
    return;
  }

  // Check if account exists.
  const { fromAccountId, toAccountId, amount } = req.body;
  const fromAccount = accounts.find(({ id }) => id === fromAccountId);
  const toAccount = accounts.find(({ id }) => id === toAccountId);
  if (fromAccount === undefined) {
    res.status(404).send({ success: false, message: 'Source account not found.' });
    return;
  }
  if (toAccount === undefined) {
    res.status(404).send({ success: false, message: 'Target account not found.' });
    return;
  }

  // Check if balance is sufficient.
  if (fromAccount.balance < amount) {
    res.status(400).send({ success: false, message: 'Source account balance insufficient.' });
    return;
  }

  // Transfer money, create log, and respond.
  fromAccount.balance -= amount;
  toAccount.balance += amount;
  const newTransferLog = {
    id: transferLogs.length,
    fromAccountId,
    toAccountId,
    amount,
    timestamp: Date.now(),
  };
  transferLogs.push(newTransferLog);
  res.send({ success: true, result: newTransferLog });
  console.log('accounts =', accounts);
  console.log('transferLogs =', transferLogs);
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
