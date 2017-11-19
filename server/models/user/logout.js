const debug = require('debug')('server:models:user:login');

const { token: { del } } = require('../../redis');

module.exports = async (token) => {
  debug('Logout user');
  debug('token:', token);

  const response = await del(token);

  return Promise.resolve({ response });
};
