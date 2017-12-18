const debug = require('debug')('server:app:index');

const App = require('yeps');

const error = require('yeps-error');
const logger = require('yeps-logger');

const redis = require('yeps-redis');
const bodyParser = require('yeps-bodyparser');
const helmet = require('yeps-helmet');
const methodOverride = require('yeps-method-override');
const cors = require('yeps-cors');
const mongoose = require('yeps-mongoose');
const chaos = require('yeps-chaos');
const response = require('yeps-response');

const files = require('./files');

const graphql = require('../graphql');
const router = require('../routes');

const app = module.exports = new App();

const isJSON = true;

debug('App created');

app
  .then(chaos())
  .then(files())
  .all([logger(), error({ isJSON })])
  .all([mongoose(), redis()])
  .then(graphql())
  .all([response(), bodyParser(), methodOverride(), helmet(), cors()])
  .then(router());
