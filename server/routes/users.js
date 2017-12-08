const debug = require('debug')('server:router:users');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /users');
  debug('Route: users');
  debug('Model: user');

  return ctx.response.resolve(user.list());
};
