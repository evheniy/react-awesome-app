const debug = require('debug')('server:models:user:login');
const jwt = require('jsonwebtoken');
const config = require('config');

const { token: { set } } = require('../../redis');
const { User } = require('../../mongoose');
const { password } = require('../../helpers');

module.exports = async (email, plainPass) => {
  debug('Login user');
  debug('email:', email);
  debug('password:', plainPass);

  const user = await User.findOne({ email });
  debug('User:', user);

  if (!user) {
    const error = new Error();
    error.code = 400;

    return Promise.reject(error);
  }

  const isPasswordMatch = await password.comparePassword(plainPass, user.password);

  if (!isPasswordMatch) {
    const error = new Error();
    error.code = 400;

    return Promise.reject(error);
  }

  const token = jwt.sign({ email, password }, config.jwt.secret);
  debug('Token:', token);

  await set(token, JSON.stringify(user));

  return Promise.resolve({ token });
};
