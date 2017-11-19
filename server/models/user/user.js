const debug = require('debug')('server:models:user:user');

const { User } = require('../../mongoose');

module.exports = async (id) => {
  debug('User');
  debug('id:', id);

  const user = await User.findById(id);
  debug('User:', user);

  return user;
};
