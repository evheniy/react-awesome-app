const debug = require('debug')('server:router:patch');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: patch');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);

  const { body } = ctx.request;
  debug('body:', body);

  return user.patch(id, body);
};
