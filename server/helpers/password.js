const debug = require('debug')('server:helpers:password');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const genSalt = promisify(bcrypt.genSalt);
const genHash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

debug('Password helper created');

const cryptPassword = async (password) => {
  debug('cryptPassword');

  try {
    const salt = await genSalt(10);
    debug('salt:', salt);

    const hash = await genHash(password, salt);
    debug('hash:', hash);

    return hash;
  } catch (error) {
    debug('Error:', error);

    throw error;
  }
};

const comparePassword = async (plainPass, hashPass) => {
  debug('comparePassword');

  try {
    const isPasswordMatch = await compare(plainPass, hashPass);
    debug('isPasswordMatch:', isPasswordMatch);

    return isPasswordMatch;
  } catch (error) {
    debug('Error:', error);

    throw error;
  }
};

module.exports = {
  cryptPassword,
  comparePassword,
};
