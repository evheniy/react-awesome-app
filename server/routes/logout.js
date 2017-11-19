const debug = require('debug')('server:router:logout');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /tokens/:token');
  debug('Route: logout');
  debug('Model: user');

  const { token } = ctx.request.params;
  debug('token:', token);

  return user.logout(token);
};
