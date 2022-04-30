const express = require('express');
const loaders = require('./src/loaders');

const main = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  loaders({ app })

  app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });
}

main();