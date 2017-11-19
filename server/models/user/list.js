const debug = require('debug')('server:models:user:list');

const { User } = require('../../mongoose');

module.exports = async () => {
  debug('User list');

  const list = await User.find({});
  debug('List:', list);

  return list;
};
