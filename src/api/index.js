const { Router } = require('express');
const home = require('./routes/home');

module.exports = () => {
  const router = Router();

  home(router);

  return router;
}