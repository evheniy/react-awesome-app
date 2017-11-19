const debug = require('debug')('server:router:registration');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /users');
  debug('Route: registration');
  debug('Model: user');

  const { email, password } = ctx.request.body;
  debug('email:', email);
  debug('password:', password);

  return user.register(email, password);
};
