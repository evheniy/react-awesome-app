const debug = require('debug')('server:models:user:register');
const { User } = require('../../mongoose');
const { password: { cryptPassword } } = require('../../helpers');

module.exports = async (email, plainPass) => {
  debug('Create user');
  debug('email:', email);
  debug('password:', plainPass);

  try {
    if (plainPass.length < 6) {
      throw new Error('Password must be longer than 5 characters.');
    }

    const password = await cryptPassword(plainPass);

    const user = new User({ email, password });
    debug('User created:', user);

    await user.save();

    debug('User saved:', user);

    return Promise.resolve(user);
  } catch (err) {
    debug('Error:', err.message);

    const error = new Error(err.message);
    error.code = 400;
    delete error.message;

    return Promise.reject(error);
  }
};
