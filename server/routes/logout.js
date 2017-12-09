const debug = require('debug')('server:router:logout');
const { user } = require('../models');

/**
 * @api {delete} /tokens/:token Request User logout
 * @apiSampleRequest /tokens/:token
 * @apiName DeleteUserToken
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} X-Access-Token Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "TOKEN"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -H "X-Access-Token:TOKEN" -X DELETE http://localhost:3000/tokens/TOKEN
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiUse UnauthorizedError
 */
module.exports = async (ctx) => {
  debug('URL: /tokens/:token');
  debug('Route: logout');
  debug('Model: user');

  const { token } = ctx.request.params;
  debug('token:', token);

  return ctx.response.resolve(user.logout(token));
};
