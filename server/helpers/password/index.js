const debug = require('debug')('server:helpers:password:index');

const cryptPassword = require('./crypt');
const comparePassword = require('./compare');

debug('Password helper created');

module.exports = {
  cryptPassword,
  comparePassword,
};
