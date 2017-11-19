const debug = require('debug')('server:router:home');
const { home } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /');
  debug('Route: home');
  debug('Model: home');

  return home(ctx);
};
