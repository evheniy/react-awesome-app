const debug = require('debug')('server:router:login');
const { user } = require('../models');

module.exports = async (ctx) => {
  debug('URL: /tokens');
  debug('Route: login');
  debug('Model: user');

  const { email, password } = ctx.request.body;
  debug('email:', email);
  debug('password:', password);

  return user.login(email, password);
};
