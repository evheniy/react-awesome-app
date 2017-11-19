const debug = require('debug')('server:models:home');
const fs = require('fs');
const path = require('path');

const index = path.resolve(__dirname, '..', '..', 'dist', 'index.html');

debug('Path to index file:', index);

module.exports = async (ctx) => {
  debug('Models: home');

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(index);

    const wrongFlowHandle = (error) => {
      debug('Piping error', error);
      readStream.destroy();
      ctx.res.statusCode = 500;
      ctx.res.end();
      return reject(error);
    };

    readStream.on('error', wrongFlowHandle);

    ctx.res
      .on('error', wrongFlowHandle)
      .on('close', wrongFlowHandle)
      .on('finish', () => {
        debug('Piping finished');
        resolve();
      });

    debug('Piping index.html');
    ctx.res.setHeader('Content-Type', 'text/html');
    readStream.pipe(ctx.res);
  });
};
