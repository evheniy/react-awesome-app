const debug = require('debug')('server:helpers:router:response');

module.exports = handler => async (ctx) => {
  debug('Router response wrapper');

  const response = JSON.stringify(await handler(ctx));

  debug('Response:', response);

  ctx.statusCode = 200;
  ctx.res.end(response);

  return Promise.reject();
};
