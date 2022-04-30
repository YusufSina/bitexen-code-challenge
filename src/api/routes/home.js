const express = require('express');
const { Router, Request, Response } = express;

module.exports = (route) => {
  route.get("/home", (req, res) => {
    return res.json(["Bitexen Code Challenge", 2022]).status(200);
  });
}