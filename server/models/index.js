const debug = require('debug')('server:models:index');
const home = require('./home');
const user = require('./user');

debug('Model created');

module.exports = {
  home,
  user,
};
