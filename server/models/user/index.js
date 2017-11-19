const debug = require('debug')('server:mongoose:user:index');
const register = require('./register');
const login = require('./login');
const list = require('./list');
const logout = require('./logout');
const user = require('./user');
const patch = require('./patch');

debug('Mongoose model index created');

module.exports = {
  register,
  login,
  list,
  logout,
  user,
  patch,
};
