const { Router } = require('express');
const home = require('./routes/home');
const transaction = require('./routes/transaction');

module.exports = () => {
  const router = Router();

  home(router);
  transaction(router);

  return router;
}