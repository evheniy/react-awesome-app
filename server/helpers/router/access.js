const debug = require('debug')('server:helpers:router:access');
const { token: { get } } = require('../../redis');

module.exports = handler => async (ctx) => {
  debug('Request access wrapper');

  const token = ctx.req.headers['x-access-token'] || ctx.request.body.token;
  debug('Url:', ctx.req.url);
  debug('Token:', token);

  if (!token) {
    debug('Error: empty user token');

    const error = new Error();
    error.code = 401;

    return Promise.reject(error);
  }

  const savedToken = await get(token);

  if (!savedToken) {
    debug('Error: Not existing user token');

    const error = new Error();
    error.code = 401;

    return Promise.reject(error);
  }

  debug('Saved token:', savedToken);
  ctx.request.token = savedToken;

  return handler(ctx);
};
