const debug = require('debug')('server:helpers:password');
const bcrypt = require('bcrypt-nodejs');
const { promisify } = require('util');

const genSalt = promisify(bcrypt.genSalt);
const genHash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

debug('Password helper created');

const cryptPassword = async (password) => {
  debug('cryptPassword');

  const salt = await genSalt(10);
  debug('salt:', salt);

  const hash = await genHash(password, salt);
  debug('hash:', hash);

  return hash;
};

const comparePassword = async (plainPass, hashPass) => {
  debug('comparePassword');

  const isPasswordMatch = await compare(plainPass, hashPass);
  debug('isPasswordMatch:', isPasswordMatch);

  return isPasswordMatch;
};

module.exports = {
  cryptPassword,
  comparePassword,
};
