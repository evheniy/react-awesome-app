const debug = require('debug')('server:helpers:password:crypt');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const genSalt = promisify(bcrypt.genSalt);
const genHash = promisify(bcrypt.hash);

debug('Password crypt helper created');

const cryptPassword = async (password) => {
  debug('cryptPassword');

  const salt = await genSalt(10);
  debug('salt:', salt);

  const hash = await genHash(password, salt);
  debug('hash:', hash);

  return hash;
};

module.exports = cryptPassword;
