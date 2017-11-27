const debug = require('debug')('server:models:user:user');

const { User } = require('../../mongoose');

module.exports = async (id) => {
  debug('User');
  debug('id:', id);

  try {
    const user = await User.findById(id);
    debug('User:', user);

    return user;
  } catch (err) {
    debug('Error:', err);

    const error = new Error();
    error.code = 404;
    return Promise.reject(error);
  }
};
