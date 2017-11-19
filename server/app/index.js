const debug = require('debug')('server:app:index');

const App = require('yeps');

const error = require('yeps-error');
const logger = require('yeps-logger');

const redis = require('yeps-redis');
const bodyParser = require('yeps-bodyparser');
const helmet = require('yeps-helmet');
const cors = require('yeps-cors');
require('yeps-mongoose');

const files = require('./files');

const router = require('../routes');

const app = module.exports = new App();

const isJSON = true;

debug('App created');

app
  .then(files())
  .all([error({ isJSON }), logger()])
  .all([redis(), bodyParser(), helmet(), cors()])
  .then(router());
