const debug = require('debug')('server:router:user');
const { user } = require('../models');

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {get} /users/:id Request User information
 * @apiSampleRequest /users/:id
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "111"
 *     }
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {String} token Users unique access-key.
 *
 * @apiSuccess {String} email Firstname of the User.
 * @apiSuccess {String} password hash  Lastname of the User.
 *
 * @apiExample {curl} Example usage:
 *     curl -i https://localhost/users/4711
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@test.com",
 *       "password": "password"
 *     }
 *
 * @apiUse UserNotFoundError
 */
module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: user');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);
  return user.user(id);
};
