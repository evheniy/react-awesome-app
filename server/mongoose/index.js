const debug = require('debug')('server:mongoose:index');
const User = require('./user');

debug('Mongoose model index created');

module.exports = {
  User,
};
