const debug = require('debug')('server:heplers:index');
const email = require('./email');
const router = require('./router');
const password = require('./password');

debug('Helpers created');

module.exports = {
  email,
  router,
  password,
};
