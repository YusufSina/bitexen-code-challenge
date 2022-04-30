const expressLoader = require('./express');

module.exports = ({ app }) => {
  console.log('Loader started!');
  expressLoader({ app });
  console.log('Initialized express!');
}