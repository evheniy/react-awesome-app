const debug = require('debug')('server:redis:token');
const redis = require('yeps-redis/redis');
const config = require('config');

debug('Redis model token created');

const get = async (token) => {
  debug('Get token:', token);
  return redis.get(token);
};

const set = async (token, data) => {
  debug('Set token:', token, data);
  await redis.set(token, data, 'ex', config.jwt.ttl);
};

const del = async (token) => {
  debug('Del token:', token);
  await redis.del(token);
};

module.exports = {
  get,
  set,
  del,
};
