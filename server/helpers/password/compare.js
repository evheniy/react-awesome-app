const debug = require('debug')('server:helpers:password:compare');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const compare = promisify(bcrypt.compare);

debug('Password compare helper created');

const comparePassword = async (plainPass, hashPass) => {
  debug('comparePassword');

  const isPasswordMatch = await compare(plainPass, hashPass);
  debug('isPasswordMatch:', isPasswordMatch);

  return isPasswordMatch;
};

module.exports = comparePassword;
