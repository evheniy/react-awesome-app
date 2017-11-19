const debug = require('debug')('server:index');

debug('Server created');

module.exports = require('./app');
