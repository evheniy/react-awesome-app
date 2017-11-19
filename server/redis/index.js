const debug = require('debug')('server:redis:index');
const token = require('./token');

debug('Redis model index created');

module.exports = {
  token,
};
