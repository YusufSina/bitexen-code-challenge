const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('../api/index.js');

module.exports = ({ app }) => {
  dotenv.config();
  
  app.get('/status', (req, res) => {
    res.json({ status: true }).status(200).end();
  })

  app.use(cors());
  app.use(express.json()); //allows us to access request body as req.body
  app.use(express.urlencoded({ extended: true }));
  // ...More middlewares

  app.use("/", routes());

  // Return the express app
  return app;
}