const debug = require('debug')('server:router:index');
const Router = require('yeps-router');
const restify = require('yeps-restify');

const { router: { accessWrapper } } = require('../helpers');

const home = require('./home');
const registration = require('./registration');
const login = require('./login');
const users = require('./users');
const logout = require('./logout');
const user = require('./user');
const patch = require('./patch');

const router = new Router();

debug('Router created');

router.get('/').then(home);
router.post('/users').then(registration);
router.post('/tokens').then(login);

router.get('/users').then(accessWrapper(users));
router.del('/tokens/:token').then(accessWrapper(logout));
router.get('/users/:id').then(accessWrapper(user));
router.patch('/users/:id').then(accessWrapper(patch));

router.get('/restify').then(restify());

module.exports = () => router.resolve();
