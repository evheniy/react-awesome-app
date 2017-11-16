const App = require('yeps');
const Router = require('yeps-router');
const error = require('yeps-error');
const logger = require('yeps-logger');
const redis = require('yeps-redis');
const bodyParser = require('yeps-bodyparser');
const helmet = require('yeps-helmet');
const cors = require('yeps-cors');
const serve = require('yeps-static');
const { resolve } = require('path');

const app = module.exports = new App();
const router = new Router();

router.get('/data').then(async (ctx) => {
  await ctx.redis.set('data', JSON.stringify({ data: 'test' }));
  ctx.res.end(await ctx.redis.get('data'));
}).post('/data').then(async (ctx) => {
  await ctx.redis.set('data', JSON.stringify(ctx.request.body));
  ctx.res.end(JSON.stringify({ message: 'ok' }));
}).all('/error').then(async () => {
  throw new Error('test');
});

const root = resolve(__dirname, '..', 'public');

app.all([
  error({ isJSON: true }),
  logger(),
]).all([
  redis(),
  bodyParser(),
  helmet(),
  cors(),
]).then(
  router.resolve(),
).then(
  serve({ root }),
);
