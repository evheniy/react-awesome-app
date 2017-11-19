const debug = require('debug')('server:app:files');
const serve = require('yeps-static');
const { resolve } = require('path');

const root = resolve(__dirname, '..', '..', 'dist');
const index = 'index.htm';

debug('Files middleware created');
debug('Path to files:', root);

module.exports = () => (ctx) => {
  debug('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'production') {
    debug('Skip for production');
    return Promise.resolve(ctx);
  }

  debug('Static server');

  return serve({ root, index })(ctx);
};
