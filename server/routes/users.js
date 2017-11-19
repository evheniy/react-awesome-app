const debug = require('debug')('server:router:users');
const { user } = require('../models');

module.exports = async () => {
  debug('URL: /users');
  debug('Route: users');
  debug('Model: user');

  return user.list();
};
