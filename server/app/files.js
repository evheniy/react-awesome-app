const debug = require('debug')('server:app:files');
const serve = require('yeps-static');
const { resolve } = require('path');
const Response = require('yeps-response/response');

const root = resolve(__dirname, '..', '..', 'dist');

debug('Files middleware created');
debug('Path to files:', root);

module.exports = () => (ctx) => {
  debug('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'production') {
    debug('Skip for production');
    return Promise.resolve(ctx);
  }

  if (ctx.req.url === '/index.html') {
    debug('Redirecting from "/index.html" to "/"');
    const response = new Response(ctx);

    return response.redirect();
  }

  if (ctx.req.url === '/') {
    debug('Skip home url');
    return Promise.resolve(ctx);
  }

  debug('Static server');

  return serve({ root })(ctx);
};
