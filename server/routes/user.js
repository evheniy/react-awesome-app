const debug = require('debug')('server:router:user');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: user');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);
  return user.user(id);
};
