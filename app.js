const express = require('express');

const main = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });
}

main();