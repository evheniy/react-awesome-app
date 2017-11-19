const debug = require('debug')('server:router:index');
const Router = require('yeps-router');

const { router: { responseWrapper, accessWrapper } } = require('../helpers');

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
router.post('/users').then(responseWrapper(registration));
router.post('/tokens').then(responseWrapper(login));

router.get('/users').then(responseWrapper(accessWrapper(users)));
router.del('/tokens/:token').then(responseWrapper(accessWrapper(logout)));
router.get('/users/:id').then(responseWrapper(accessWrapper(user)));
router.patch('/users/:id').then(responseWrapper(accessWrapper(patch)));

module.exports = () => router.resolve();
