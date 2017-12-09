const debug = require('debug')('server:router:login');
const { user } = require('../models');

/**
 * @api {post} tokens/ Request User login
 * @apiSampleRequest /tokens/
 * @apiName PostUserLogin
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (User data) {String} email User email.
 * @apiParam (User data) {String} password User password.
 *
 * @apiSuccess {String} token User token.
 *
 * @apiExample {curl} Example usage:
 *     curl --data "email=test@test.com&password=password" http://localhost:3000/tokens/
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 *
 * @apiUse BadRequestError
 */
module.exports = async (ctx) => {
  debug('URL: /tokens');
  debug('Route: login');
  debug('Model: user');

  const { email, password } = ctx.request.body;
  debug('email:', email);
  debug('password:', password);

  return ctx.response.resolve(user.login(email, password));
};
